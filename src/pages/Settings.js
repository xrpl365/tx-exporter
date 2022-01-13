import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import Switch from "react-ios-switch";

import SettingsContext from "../context/settingsContext";
import OTTContext from "../context/ottContext";
import TransactionsContext from "../context/transactionsContext";

import PageHeader from "../components/Shared/PageHeader";
import HelpIcon from "../components/HelpIcon/HelpIcon";

function Settings(props) {
  const settingsContext = useContext(SettingsContext);
  const ottContext = useContext(OTTContext);
  const txContext = useContext(TransactionsContext);

  const feeChangeHandler = () => {
    settingsContext.toggleFeeUsage();
  };

  const pinAccountChangeHandler = () => {
    settingsContext.togglePinAccount();
  };

  const txExpiryHandler = (e) => {
    settingsContext.setTxExpiry(e.target.value);
  };

  const selectLanguage = (e) => {
    ottContext.setLanguage(e.target.value);
  };

  const refreshLedgerHandler = () => {
    txContext.refresh();
    props.closePage();
  };

  return (
    <main>
      <PageHeader title="app.setting.title" defaultMessage="Settings" />

      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.settings.label.pinaccount"
            defaultMessage="Show XRP fees"
          />
          <HelpIcon
            title="app.settings.help.pinaccount.title"
            content="app.settings.help.pinaccount.description"
          />
        </label>
        <div>
          <Switch
            checked={settingsContext.pinAccount}
            onChange={pinAccountChangeHandler}
            onColor="rgb(59, 220, 150)"
            offColor="rgb(172, 177, 193)"
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.settings.label.showfee"
            defaultMessage="Show XRP fees"
          />
          <HelpIcon
            title="app.settings.help.showfee.title"
            content="app.settings.help.showfee.description"
          />
        </label>
        <div>
          <Switch
            checked={settingsContext.showFee}
            onChange={feeChangeHandler}
            onColor="rgb(59, 220, 150)"
            offColor="rgb(172, 177, 193)"
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.settings.label.language"
            defaultMessage="Language"
          />
          <HelpIcon
            title="app.settings.help.language.title"
            content="app.settings.help.language.description"
          />
        </label>
        <div>
          <select value={ottContext.locale} onChange={selectLanguage}>
            {ottContext.getSupportedLanguages().map((l, index) => (
              <option key={index} value={l.key}>
                {l.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.settings.label.ledger-cache"
            defaultMessage="Ledger cache"
          />
          <HelpIcon
            title="app.settings.help.ledger-cache.title"
            content="app.settings.help.ledger-cache.description"
          />
        </label>
        <div>
          <select value={settingsContext.txExpiry} onChange={txExpiryHandler}>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="28">28 days</option>
            <option value="365">365 days</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.settings.label.refresh"
            defaultMessage="Refresh ledger cache"
          />
          <HelpIcon
            title="app.settings.help.refresh.title"
            content="app.settings.help.refresh.description"
          />
        </label>
        <div>
          <button
            className="btn btn-danger"
            style={{ marginTop: "4px" }}
            onClick={refreshLedgerHandler}
          >
            Refresh Ledger
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.settings.label.credits"
            defaultMessage="Credits"
          />
        </label>
        <div className="credits">
          <FormattedMessage
            id="app.settings.link.credits"
            defaultMessage="About xrpl365"
            values={{
              p: (...chunks) => <p>{chunks}</p>,
              strong: (...chunks) => <strong>{chunks}</strong>,
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default Settings;
