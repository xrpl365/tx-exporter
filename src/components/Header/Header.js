import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import OTTContext from "../../context/ottContext";
import SettingsContext from "../../context/settingsContext";
import TransactionsContext from "../../context/transactionsContext";

import PageHeader from "../Shared/PageHeader";
import HelpIcon from "../HelpIcon/HelpIcon";

function Header() {
  const ottContext = useContext(OTTContext);
  const settingsContext = useContext(SettingsContext);
  const txContext = useContext(TransactionsContext);

  const filteredTransactions = txContext.filterTransactions();

  const displayEntriesCount = (props) => {
    if (settingsContext.showFee) {
      if (filteredTransactions.length < txContext.allTransactions.length) {
        return (
          filteredTransactions.length + " / " + txContext.allTransactions.length
        );
      }
      return txContext.allTransactions.length;
    } else {
      const transactionCountNoFees = txContext.allTransactions.filter(
        (tx) =>
          tx.is_fee !== 1 ||
          (tx.txtype !== "Payment" && tx.txtype !== "OfferCreate")
      ).length;
      if (filteredTransactions.length < transactionCountNoFees) {
        return filteredTransactions.length + " / " + transactionCountNoFees;
      }
      return transactionCountNoFees;
    }
  };

  return (
    <header
      className={`background ${settingsContext.pinAccount ? "sticky" : ""}`}
    >
      <PageHeader title="app.transaction.title" defaultMessage="Transactions" />

      <div className="account">
        <div className="account-address">
          <label>
            <FormattedMessage
              id="app.header.account"
              defaultMessage="Account"
            />
            <HelpIcon
              title="app.header.account.help.title"
              content="app.header.account.help.description"
            />
          </label>
          <div>
            {ottContext.account
              ? ottContext.account
              : "Invalid account provided"}
          </div>
        </div>
      </div>

      <div className="account">
        <div className="account-entries">
          <label>
            <FormattedMessage
              id="app.header.entries"
              defaultMessage="Entries"
            />
            <HelpIcon
              title="app.header.entries.help.title"
              content="app.header.entries.help.description"
            />
          </label>
          <div>{displayEntriesCount()}</div>
        </div>
        <div className="account-last-scan">
          <label>
            <HelpIcon
              title="app.header.lastscan.help.title"
              content="app.header.lastscan.help.description"
            />
            <FormattedMessage
              id="app.header.lastscan"
              defaultMessage="Last Scan"
            />
          </label>
          <div>{txContext.lastScanDate}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
