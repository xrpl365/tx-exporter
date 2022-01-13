import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
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
          <option value="Payment">Payment</option>
          <option value="OfferCreate">Offer Create</option>
          <option value="OfferCancel">Offer Cancel</option>
          <option value="TrustSet">Trust Set</option>
          <option value="AccountSet">Account Set</option>
          <option value="AccountDelete">Account Delete</option>
          <option value="SetRegularKey">Set Regular Key</option>
          <option value="SignerListSet">Signer List Set</option>
          <option value="EscrowCreate">Escrow Create</option>
          <option value="EscrowFinish">Escrow Finish</option>
          <option value="EscrowCancel">Escrow Cancel</option>
          <option value="PaymentChannelCreate">Payment Channel Create</option>
          <option value="PaymentChannelFund">Payment Channel Fund</option>
          <option value="PaymentChannelClaim">Payment Channel Claim</option>
          <option value="DepositPreauth">Deposit Pre-Auth</option>
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
