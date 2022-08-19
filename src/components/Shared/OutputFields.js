import React, { useState, useRef, useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import Switch from "react-ios-switch";

import SettingsContext from "../../context/settingsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";

import { Modal } from "bootstrap/dist/js/bootstrap.esm.min";

function OutputFields(props) {
  const [outputFieldsModal, setOutputFieldsModal] = useState([]);
  const outputFieldsModalRef = useRef();
  const settingsContext = useContext(SettingsContext);

  useEffect(() => {
    const modal = new Modal(outputFieldsModalRef.current, {
      keyboard: false,
      backdrop: "static",
    });
    setOutputFieldsModal(modal);
  }, []);

  const changeOutputFieldsHandler = () => {
    outputFieldsModal.show();
  };

  const toggleTxTypeHandler = () => {
    settingsContext.toggleOutputField("TXTYPE");
  };

  const toggleDirectionHandler = () => {
    settingsContext.toggleOutputField("DIRECTION");
  };

  const toggleAmountHandler = () => {
    settingsContext.toggleOutputField("AMOUNT");
  };

  const toggleDateHandler = () => {
    settingsContext.toggleOutputField("DATE");
  };

  const toggleCurrencyHandler = () => {
    settingsContext.toggleOutputField("CURRENCY");
  };

  const toggleIssuerHandler = () => {
    settingsContext.toggleOutputField("ISSUER");
  };

  const toggleIsFeeHandler = () => {
    settingsContext.toggleOutputField("ISFEE");
  };

  const toggleFeeHandler = () => {
    settingsContext.toggleOutputField("FEE");
  };

  const toggleLedgerHandler = () => {
    settingsContext.toggleOutputField("LEDGER");
  };

  const toggleHashHandler = () => {
    settingsContext.toggleOutputField("HASH");
  };

  const toggleSenderHandler = () => {
    settingsContext.toggleOutputField("SENDER");
  };

  const toggleReceiverHandler = () => {
    settingsContext.toggleOutputField("RECEIVER");
  };
  const toggleDestinationTagHandler = () => {
    settingsContext.toggleOutputField("DESTINATIONTAG");
  };
  const toggleSourceTagHandler = () => {
    settingsContext.toggleOutputField("SOURCETAG");
  };
  return (
    <>
      <div className="export-fields">
        {props.headings.map((h, index) => {
          return <span key={index}>{h}</span>;
        })}
        <span className="edit-fields" onClick={changeOutputFieldsHandler}>
          <FontAwesomeIcon icon={faPen} />
        </span>
      </div>

      <div className="modal" tabIndex="-1" ref={outputFieldsModalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <FormattedMessage id="app.export.fields.title" defaultMessage="Output fields" />
              </h5>
              <button type="button" data-bs-dismiss="modal" aria-label="Close">
                &times;
              </button>
            </div>
            <div className="modal-body editable-fields row">
              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.txtype" defaultMessage="Tx Type" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.txType}
                    onChange={toggleTxTypeHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.direction" defaultMessage="Direction" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.direction}
                    onChange={toggleDirectionHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.amount" defaultMessage="Amount" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.amount}
                    onChange={toggleAmountHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.date" defaultMessage="Date" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.date}
                    onChange={toggleDateHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.currency" defaultMessage="Currency" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.currency}
                    onChange={toggleCurrencyHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.issuer" defaultMessage="Issuer" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.issuer}
                    onChange={toggleIssuerHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.isfee" defaultMessage="Is Fee" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.isFee}
                    onChange={toggleIsFeeHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.fee" defaultMessage="Fee" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.fee}
                    onChange={toggleFeeHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.ledger" defaultMessage="Ledger" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.ledger}
                    onChange={toggleLedgerHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.hash" defaultMessage="Hash" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.hash}
                    onChange={toggleHashHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.sender" defaultMessage="Sender" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.sender}
                    onChange={toggleSenderHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.receiver" defaultMessage="Receiver" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.receiver}
                    onChange={toggleReceiverHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.destination-tag" defaultMessage="Destination Tag" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.destinationTag}
                    onChange={toggleDestinationTagHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>

              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="app.export.fields.source-tag" defaultMessage="Source Tag" />
                </label>
                <div>
                  <Switch
                    checked={settingsContext.fields.sourceTag}
                    onChange={toggleSourceTagHandler}
                    onColor="rgb(59, 220, 150)"
                    offColor="rgb(172, 177, 193)"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OutputFields;
