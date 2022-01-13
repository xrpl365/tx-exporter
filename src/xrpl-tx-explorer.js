const Client = require("rippled-ws-client");
const { parseBalanceChanges } = require("ripple-lib-transactionparser");

const txexplorer = async (account, cb, returnTx) => {
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
            const currency =
              mutation.counterparty === "" ? "XRP" : mutation.currency;

            const counterparty =
              mutation.counterparty === "" ? "" : mutation.counterparty;

            const isFee =
              direction === "sent" &&
              Number(mutation.value) * -1 * 1000000 === Number(tx?.Fee)
                ? 1
                : 0;

            const fee =
              direction === "sent" && isFee === 0
                ? (Number(tx?.Fee) / 1000000) * -1
                : 0;

            cb({
              ledger: tx.ledger_index,
              direction: direction,
              txtype: tx.TransactionType,
              date: moment,
              currency: currency,
              counterparty: counterparty,
              // Adjusted to show XRP value without fee, as it is shown separately.
              amount:
                currency !== "XRP" || (currency === "XRP" && isFee === 1)
                  ? mutation.value
                  : tx.Amount / 1000000,
              is_fee: isFee,
              fee: fee,
              hash: tx.hash,
              // _tx: returnTx ? tx : undefined,
              // _meta: returnTx ? meta : undefined,
            });
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
      limit: 10,
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
