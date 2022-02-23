import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import SettingsContext from "../../context/settingsContext";
import HelpIcon from "../HelpIcon/HelpIcon";

const getTxType = (txType, isFee) => {
  switch (txType) {
    case "Payment":
      return !isFee ? "app.txtypes.payment" : "app.txtypes.fee";
    case "OfferCreate":
      return "app.txtypes.offercreate";
    case "OfferCancel":
      return "app.txtypes.offercancel";
    case "TrustSet":
      return "app.txtypes.trustset";
    case "AccountSet":
      return "app.txtypes.accountset";
    case "AccountDelete":
      return "app.txtypes.accountdelete";
    case "SetRegularKey":
      return "app.txtypes.setregularkey";
    case "SignerListSet":
      return "app.txtypes.signerlistset";
    case "EscrowCreate":
      return "app.txtypes.escrowcreate";
    case "EscrowFinish":
      return "app.txtypes.escrowfinish";
    case "EscrowCancel":
      return "app.txtypes.escrowcancel";
    case "PaymentChannelCreate":
      return "app.txtypes.paymentchannelcreate";
    case "PaymentChannelFund":
      return "app.txtypes.paymentchannelfund";
    case "PaymentChannelClaim":
      return "app.txtypes.paymentchannelclaim";
    case "DepositPreauth":
      return "app.txtypes.depositpreauth";
    default:
      return "app.general.unknown";
  }
};

const getTxDirection = (txDirection) => {
  switch (txDirection) {
    case "sent":
      return "app.txdirection.sent";
    case "received":
      return "app.txdirection.received";
    case "other":
      return "app.general.unknown";
    default:
      return "app.general.unknown";
  }
};

const displayFee = (fee) => {
  return (
    <div className="tx-val">
      <label>
        <FormattedMessage id="app.transaction.label.fee" defaultMessage="Fee" />
      </label>
      <div>{fee.toString().replace("-", "")}</div>
    </div>
  );
};

const displayLedger = (ledger) => (
  <div className="tx-val">
    <label>
      <FormattedMessage
        id="app.transaction.label.ledger"
        defaultMessage="Ledger"
      />
    </label>
    <div>{ledger}</div>
  </div>
);

const displayCurrency = (c) => {
  if (c === "XRP") {
    return <div>XRP</div>;
  }
  return <div>{c.length > 12 ? c.substring(0, 10) : c}</div>;
};

const displayAmount = (a) => {
  if (!a) {
    return <div></div>;
  }
  return (
    <>
      <label>
        <FormattedMessage
          id="app.transaction.label.amount"
          defaultMessage="Amount"
        />
      </label>
      <div>
        {a.toString().toLowerCase().includes("e") && (
          <HelpIcon
            title="app.transaction.help.name.sci"
            content="app.transaction.help.description.sci"
          />
        )}
        {a.toString().replace("-", "")}
      </div>
    </>
  );
};

const sentOrReceived = (tx) => {
  if (tx.txtype === "Payment" && tx.is_fee === 0) {
    return (
      <div className="tx-row">
        <div className="tx-col">
          <div className="tx-val">
            <label>
              <FormattedMessage
                id={
                  tx.direction === "received"
                    ? "app.transaction.label.sender"
                    : "app.transaction.label.recipient"
                }
                defaultMessage={tx.direction === "received" ? "From" : "To"}
              />
            </label>
            <div>{tx.direction === "received" ? tx.sender : tx.receiver}</div>
          </div>
        </div>
      </div>
    );
  }
};

function Transaction(props) {
  const settingsContext = useContext(SettingsContext);

  const { tx } = props;
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="tx-row">
          <div className="tx-col-left">
            <div className="tx-val">
              <label>
                <FormattedMessage
                  id="app.transaction.label.txtype"
                  defaultMessage="Type"
                />
              </label>
              <div>
                <FormattedMessage
                  id={getTxType(tx.txtype, +tx.is_fee === 1)}
                  defaultMessage="Payment"
                />
              </div>
            </div>
            <div className="tx-val">
              <label>
                <FormattedMessage
                  id="app.transaction.label.direction"
                  defaultMessage="Direction"
                />
              </label>
              <div>
                <FormattedMessage
                  id={getTxDirection(tx.direction)}
                  defaultMessage=""
                />
              </div>
            </div>
            <div className="tx-val">
              <label>
                <FormattedMessage
                  id="app.transaction.label.date"
                  defaultMessage="Date"
                />
              </label>
              <div>
                {new Date(tx.date)
                  .toISOString()
                  .replace(/T/, " ")
                  .replace(/\..+/, "")}
              </div>
            </div>
          </div>
          <div className="tx-col-right">
            <div className="tx-val">
              <label>
                <FormattedMessage
                  id="app.transaction.label.currency"
                  defaultMessage="Amount"
                />
              </label>
              {displayCurrency(tx.currency)}
            </div>
            <div className="tx-val">{displayAmount(tx.amount)}</div>
            {!settingsContext.showFee && tx.fee !== 0
              ? displayFee(tx.fee)
              : null}
            {!settingsContext.showFee && tx.txtype === "OfferCreate"
              ? displayLedger(tx.ledger)
              : null}
            {settingsContext.showFee && tx.is_fee === 1
              ? displayFee(tx.fee)
              : null}
            {(settingsContext.showFee &&
              tx.txtype === "Payment" &&
              tx.direction === "sent") ||
            (settingsContext.showFee && tx.txtype === "OfferCreate")
              ? displayLedger(tx.ledger)
              : null}
          </div>
        </div>
        {sentOrReceived(tx)}
      </div>
    </div>
  );
}

export default Transaction;
