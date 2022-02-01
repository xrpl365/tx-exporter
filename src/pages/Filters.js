import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import TransactionsContext from "../context/transactionsContext";

import PageHeader from "../components/Shared/PageHeader";
import DateTime from "../components/Shared/DateTime";
import HelpIcon from "../components/HelpIcon/HelpIcon";

function Filters(props) {
  const txContext = useContext(TransactionsContext);

  const [startDate, setStartDate] = useState(txContext.filters.startDate);
  const [endDate, setEndDate] = useState(txContext.filters.endDate);
  const [currency, setCurrency] = useState(txContext.filters.currency);
  const [direction, setDirection] = useState(txContext.filters.direction);
  const [txType, setTxType] = useState(txContext.filters.txType);

  const intl = useIntl();

  const setFilters = () => {
    txContext.setFilters({
      startDate: startDate,
      endDate: endDate,
      currency: currency,
      direction: direction,
      txType: txType,
    });
    props.closePage();
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setCurrency("");
    setDirection("");
    setTxType("");

    txContext.setFilters({
      startDate: "",
      endDate: "",
      currency: "",
      direction: "",
      txType: "",
    });
    props.closePage();
  };
  const updateStartDateFilter = (startDate) => {
    setStartDate(startDate);
  };
  const updateEndDateFilter = (endDate) => {
    setEndDate(endDate);
  };
  const updateCurrencyFilter = (e) => {
    setCurrency(e.target.value);
  };
  const updateDirectionFilter = (e) => {
    setDirection(e.target.value);
  };
  const updateTxTypeFilter = (e) => {
    setTxType(e.target.value);
  };

  return (
    <main>
      <div className="temp-beta-note">
        App is in beta, please report all bugs
      </div>
      <PageHeader title="app.filters.title" defaultMessage="Filters" />
      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.filters.label.startdate"
            defaultMessage="Start date"
          />
          <HelpIcon
            title="app.filters.help.startdate.title"
            content="app.filters.help.startdate.description"
          />
        </label>
        <DateTime update={updateStartDateFilter} inputDate={startDate} />
      </div>
      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.filters.label.enddate"
            defaultMessage="End date"
          />
          <HelpIcon
            title="app.filters.help.enddate.title"
            content="app.filters.help.enddate.description"
          />
        </label>
        <DateTime update={updateEndDateFilter} inputDate={endDate} />
      </div>
      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.filters.label.currency"
            defaultMessage="End date"
          />
          <HelpIcon
            title="app.filters.help.currency.title"
            content="app.filters.help.currency.description"
          />
        </label>
        <select value={currency} onChange={updateCurrencyFilter}>
          <option value="">All</option>
          {txContext.getCurrencies().map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.filters.label.direction"
            defaultMessage="Direction"
          />
          <HelpIcon
            title="app.filters.help.direction.title"
            content="app.filters.help.direction.description"
          />
        </label>
        <select value={direction} onChange={updateDirectionFilter}>
          <option value="">All</option>
          <option value="sent">Sent</option>
          <option value="received">Received</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <FormattedMessage
            id="app.filters.label.type"
            defaultMessage="Transaction type"
          />
          <HelpIcon
            title="app.filters.help.type.title"
            content="app.filters.help.type.description"
          />
        </label>
        <select value={txType} onChange={updateTxTypeFilter}>
          <option value="">All</option>
          <option value="Payment">
            {intl.formatMessage({
              id: "app.txtypes.payment",
              defaultMessage: "Payment",
            })}
          </option>
          <option value="OfferCreate">
            {intl.formatMessage({
              id: "app.txtypes.offercreate",
              defaultMessage: "Offer Create",
            })}
          </option>
          <option value="OfferCancel">
            {intl.formatMessage({
              id: "app.txtypes.offercancel",
              defaultMessage: "Offer Cancel",
            })}
          </option>
          <option value="TrustSet">
            {intl.formatMessage({
              id: "app.txtypes.trustset",
              defaultMessage: "Trust Set",
            })}
          </option>
          <option value="AccountSet">
            {intl.formatMessage({
              id: "app.txtypes.accountset",
              defaultMessage: "Account Set",
            })}
          </option>
          <option value="AccountDelete">
            {intl.formatMessage({
              id: "app.txtypes.accountdelete",
              defaultMessage: "Account Delete",
            })}
          </option>
          <option value="SetRegularKey">
            {intl.formatMessage({
              id: "app.txtypes.setregularkey",
              defaultMessage: "Set Regular Key",
            })}
          </option>
          <option value="SignerListSet">
            {intl.formatMessage({
              id: "app.txtypes.signerlistset",
              defaultMessage: "Signer List Set",
            })}
          </option>
          <option value="EscrowCreate">
            {intl.formatMessage({
              id: "app.txtypes.escrowcreate",
              defaultMessage: "Escrow Create",
            })}
          </option>
          <option value="EscrowFinish">
            {intl.formatMessage({
              id: "app.txtypes.escrowfinish",
              defaultMessage: "Escrow Finish",
            })}
          </option>
          <option value="EscrowCancel">
            {intl.formatMessage({
              id: "app.txtypes.escrowcancel",
              defaultMessage: "Escrow Cancel",
            })}
          </option>
          <option value="PaymentChannelCreate">
            {intl.formatMessage({
              id: "app.txtypes.paymentchannelcreate",
              defaultMessage: "Payment Channel Create",
            })}
          </option>
          <option value="PaymentChannelFund">
            {intl.formatMessage({
              id: "app.txtypes.paymentchannelfund",
              defaultMessage: "Payment Channel Fund",
            })}
          </option>
          <option value="PaymentChannelClaim">
            {intl.formatMessage({
              id: "app.txtypes.paymentchannelclaim",
              defaultMessage: "Payment Channel Claim",
            })}
          </option>
          <option value="DepositPreauth">
            {intl.formatMessage({
              id: "app.txtypes.depositpreauth",
              defaultMessage: "Deposit Pre-Auth",
            })}
          </option>
        </select>
      </div>

      <div className="form-group buttons">
        <button className="btn btn-primary" onClick={setFilters}>
          <FormattedMessage
            id="app.filters.button.apply"
            defaultMessage="Apply"
          />
        </button>
        <button className="btn btn-secondary" onClick={clearFilters}>
          <FormattedMessage
            id="app.filters.button.clear"
            defaultMessage="Cancel"
          />
        </button>
      </div>
    </main>
  );
}

export default Filters;
