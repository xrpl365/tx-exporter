const Client = require("rippled-ws-client");
const { parseBalanceChanges } = require("ripple-lib-transactionparser");
const Buffer = require("buffer").Buffer;

const currencyCodeFormat = (string, maxLength = 12) => {
  if (string.trim().toLowerCase() === "xrp") {
    return "XRP";
  }
  if (string.length === 3 && string.trim().toLowerCase() !== "xrp") {
    // Normal currency code
    return string.trim();
  }
  if (string.match(/^[a-fA-F0-9]{40}$/) && !isNaN(parseInt(string, 16))) {
    // HEX currency code
    const hex = string.toString().replace(/(00)+$/g, "");
    if (hex.startsWith("02")) {
      const xlf15d = Buffer.from(hex, "hex").slice(8).toString("utf-8").slice(0, maxLength).trim();
      if (xlf15d.match(/[a-zA-Z0-9]{3,}/) && xlf15d.toLowerCase() !== "xrp") {
        return xlf15d;
      }
    }
    const decodedHex = Buffer.from(hex, "hex").toString("utf-8").slice(0, maxLength).trim();
    if (decodedHex.match(/[a-zA-Z0-9]{3,}/) && decodedHex.toLowerCase() !== "xrp") {
      return decodedHex;
    }
  }
  return "Unknown";
};

const txexplorer = async (account, cb) => {
  const display = (result) => {
    if (result?.transactions) {
      result?.transactions.forEach((r) => {
        const { tx, meta } = r;
        let direction = "other";
        if (tx?.Account === account) direction = "sent";
        if (tx?.Destination === account) direction = "received";
        const moment = new Date((tx.date + 946684800) * 1000).toISOString();
        const balanceChanges = parseBalanceChanges(meta);
        if (Object.keys(balanceChanges).indexOf(account) > -1) {
          const mutations = balanceChanges[account];
          mutations.forEach((mutation) => {
            const currency = mutation.counterparty === "" ? "XRP" : mutation.currency;

            const issuer = mutation.counterparty === "" ? "" : mutation.counterparty;

            const isFee =
              direction === "sent" && Number(mutation.value) * -1 * 1000000 === Number(tx?.Fee)
                ? 1
                : 0;

            let fee = direction === "sent" && isFee === 0 ? (Number(tx?.Fee) / 1000000) * -1 : 0;

            let amount = mutation.value
              ? currency === "XRP"
                ? parseFloat(mutation.value) - parseFloat(fee)
                : parseFloat(mutation.value)
              : 0;

            /* Fee should show in fees, not amounts, override default behavior */
            if (isFee === 1) {
              fee = amount;
              amount = 0;
            }

            let directionOverride;
            if (tx.TransactionType === "OfferCreate") {
              if (direction === "sent") {
                // there is a fee on sent transactions
                if (mutation.counterparty === "") {
                  // xrp was sent, so the fee is included in this mutation, deduct it
                  amount = parseFloat(mutation.value) - parseFloat(fee);
                } else {
                  fee = 0; // No fee on mutations for non-xrp currencies
                }
              } else {
                amount = parseFloat(mutation.value);
                fee = 0; // No fee when direction is not sent, as it was already paid in a previous TX.
              }

              /* Fix direction on OfferCreate */
              directionOverride = amount > 0 ? "received" : "sent";
            }

            // Add sender and receiver data for payments
            let sender, receiver;
            if ((tx.TransactionType === "Payment") & (isFee === 0)) {
              sender = direction === "sent" ? account : tx.Account;
              receiver = direction === "received" ? account : tx.Destination;
            }

            cb({
              ledger: tx.ledger_index,
              hash: tx.hash,
              date: moment,
              txtype: tx.TransactionType,
              direction: directionOverride ? directionOverride : direction,
              currency: currencyCodeFormat(currency),
              issuer: issuer,
              amount: Number(amount.toFixed(6)), // show amounts to a fixed number of places (6), equal to drops.
              is_fee: isFee,
              fee: fee,
              sender: sender,
              receiver: receiver,
              destinationTag: tx && tx.DestinationTag ? tx.DestinationTag : null,
              sourceTag: tx && tx.SourceTag ? tx.SourceTag : null,
            });

            if (direction === "sent" && currency === "XRP" && isFee === 0) {
              // Ensure XRP TX always show fees separate as well as non-xrp currencies
              cb({
                ledger: tx.ledger_index,
                hash: tx.hash,
                date: moment,
                txtype: tx.TransactionType,
                direction: "sent",
                currency: "XRP",
                issuer: "",
                amount: 0,
                is_fee: 1,
                fee: fee,
              });
            }
          });
        }
      });
    }
  };

  const client = await new Client("wss://xrplcluster.com", {
    NoUserAgent: true,
  });

  const getMore = async (marker) => {
    const result = await client.send({
      command: "account_tx",
      account,
      limit: 2,
      marker,
    });

    display(result);
    return result?.marker;
  };

  let proceed = await getMore();

  while (proceed) {
    proceed = await getMore(proceed);
  }

  client.close();
};

export default txexplorer;
