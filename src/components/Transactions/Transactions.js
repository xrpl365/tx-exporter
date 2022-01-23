import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import TransactionsContext from "../../context/transactionsContext";
import Transaction from "../Transaction/Transaction";

function Transactions(props) {
  const txContext = useContext(TransactionsContext);
  const transactions = txContext.filterTransactions();
  const totalTransactions = txContext.allTransactions;
  const fetchingTransactions = txContext.fetchingTransactions;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const showTransactions = () => {
    if (loading) {
      return (
        <div className="transactions">
          <div className="col-md-12">
            <div className="card tx-msg">
              <p>
                <FormattedMessage
                  id="app.transaction.fetching-notice-local"
                  defaultMessage="Restoring transactions from local cache"
                />
              </p>
              <div className="lds-hourglass"></div>
            </div>
          </div>
        </div>
      );
    }

    if (fetchingTransactions) {
      return (
        <div className="transactions">
          <div className="col-md-12">
            <div className="card tx-msg">
              <p>
                <FormattedMessage
                  id="app.transaction.fetching-notice"
                  defaultMessage="Retrieving transactions from XRPL"
                />
              </p>
              <div className="lds-hourglass"></div>
            </div>
          </div>
        </div>
      );
    }

    if (
      totalTransactions &&
      totalTransactions.length > 0 &&
      transactions.length === 0
    ) {
      return (
        <div className="col-md-12">
          <div className="card tx-msg">
            <p>
              <FormattedMessage
                id="app.transaction.zero-transactions-using-filters"
                defaultMessage="0 transactions using current filters"
              />
            </p>
          </div>
        </div>
      );
    }

    if (totalTransactions && totalTransactions.length === 0) {
      return (
        <div className="col-md-12">
          <div className="card tx-msg">
            <p>
              <FormattedMessage
                id="app.transaction.zero-transactions-on-ledger"
                defaultMessage="0 transactions on the ledger"
              />
            </p>
          </div>
        </div>
      );
    }

    if (totalTransactions && totalTransactions.length > 0) {
      return transactions.map((tx, index) => (
        <Transaction tx={tx} key={index} />
      ));
    }
  };

  return (
    <div className="transactions">
      <div className="row">{showTransactions()}</div>
    </div>
  );
}

export default Transactions;
