import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import SettingsContext from "../../context/settingsContext";

const getTxType = (txType, isFee) => {
  switch (txType) {
    case "Payment":
      return !isFee ? "app.txtypes.payment" : "app.txtypes.fee";
    case "TrustSet":
      return "app.txtypes.trustset";
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
      <div>{a.toString().replace("-", "")}</div>
    </>
  );
};

function Transaction(props) {
  const settingsContext = useContext(SettingsContext);

  const { tx } = props;
  return (
    <div className="col-md-6">
      <div className="card tx-row">
        <div className="tx-col-left">
          <div className="tx-val">
            <label>
              <FormattedMessage
                id="app.transaction.label.txtype"
                defaultMessage="Tx type"
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
          {!settingsContext.showFee && tx.is_fee === 0 && tx.fee !== 0
            ? displayFee(tx.fee)
            : null}
          {settingsContext.showFee && tx.currency === "XRP" && tx.fee !== 0
            ? displayFee(tx.fee)
            : null}
          {settingsContext.showFee && tx.currency !== "XRP"
            ? displayLedger(tx.ledger)
            : null}
          {settingsContext.showFee && tx.currency === "XRP" && tx.fee === 0
            ? displayLedger(tx.ledger)
            : null}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
