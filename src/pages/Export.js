import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { saveAs } from "file-saver";
import Switch from "react-ios-switch";
import copyTextToClipboard from "../clipboard";

import OTTContext from "../context/ottContext";
import TransactionsContext from "../context/transactionsContext";
import SettingsContext from "../context/settingsContext";

import PageHeader from "../components/Shared/PageHeader";
import HelpIcon from "../components/HelpIcon/HelpIcon";
import OutputFields from "../components/Shared/OutputFields";

function Export() {
  const txContext = useContext(TransactionsContext);
  const ottContext = useContext(OTTContext);
  const settingsContext = useContext(SettingsContext);
  const [csvString, setCsvString] = useState();
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(false);

  const prepareExportDataForCSV = () => {
    const { fields: exportFields } = settingsContext;
    const filteredTransactions = txContext.filterTransactions();
    const exportTransactions = filteredTransactions.map((row) => {
      let r = [];
      exportFields.txType && r.push(row.txtype);
      exportFields.direction && r.push(row.direction);
      exportFields.amount && r.push(row.amount);
      exportFields.date && r.push(row.date);
      exportFields.currency && r.push(row.currency);
      exportFields.issuer && r.push(row.issuer);
      exportFields.isFee && r.push(row.is_fee);
      exportFields.fee && r.push(row.fee);
      exportFields.ledger && r.push(row.ledger);
      exportFields.hash && r.push(row.hash);
      return r;
    });

    if (+settingsContext.outputFormat === 0 && settingsContext.includeHeader) {
      const headings = generateHeadings();
      exportTransactions.unshift(headings);
    }

    return exportTransactions;
  };

  const generateHeadings = () => {
    const { fields: exportFields } = settingsContext;
    const headings = [];
    exportFields.txType && headings.push("tx_type");
    exportFields.direction && headings.push("direction");
    exportFields.amount && headings.push("amount");
    exportFields.date && headings.push("date");
    exportFields.currency && headings.push("currency");
    exportFields.issuer && headings.push("issuer");
    exportFields.isFee && headings.push("is_fee");
    exportFields.fee && headings.push("fee");
    exportFields.ledger && headings.push("ledger");
    exportFields.hash && headings.push("hash");
    return headings;
  };

  const prepareExportDataForJSON = () => {
    const { fields: exportFields } = settingsContext;
    const filteredTransactions = txContext.filterTransactions();
    const exportTransactions = filteredTransactions.map((row) => {
      return {
        ...(exportFields.txType && { tx_type: row.txtype }),
        ...(exportFields.direction && { direction: row.direction }),
        ...(exportFields.amount && { amount: row.amount }),
        ...(exportFields.date && { date: row.date }),
        ...(exportFields.currency && { currency: row.currency }),
        ...(exportFields.issuer && { issuer: row.issuer }),
        ...(exportFields.isFee && { is_fee: row.is_fee }),
        ...(exportFields.fee && { fee: row.fee }),
        ...(exportFields.ledger && { ledger: row.ledger }),
        ...(exportFields.hash && { hash: row.hash }),
      };
    });

    return JSON.stringify(exportTransactions);
  };

  const generateCSV = (rows) => {
    const processRow = (row) => {
      let finalVal = "";
      const del = settingsContext.getSelectedDelimiter();

      for (let j = 0; j < row.length; j++) {
        let innerValue =
          row[j] === null || row[j] === undefined ? "" : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        }
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
        if (j > 0) finalVal += del;
        finalVal += result;
      }
      return finalVal + "\n";
    };

    let csvString = "";
    for (let i = 0; i < rows.length; i++) {
      csvString += processRow(rows[i]);
    }
    return csvString;
  };

  const copyToClipboard = () => {
    if (+settingsContext.outputFormat === 0) {
      const data = prepareExportDataForCSV();
      const csv = generateCSV(data);
      copyTextToClipboard(csv);
      setCsvString(csv);
      return;
    }
    if (+settingsContext.outputFormat === 1) {
      //JSON
      const data = prepareExportDataForJSON();
      setCsvString(data);
      copyTextToClipboard(data);
      return;
    }
  };

  const saveToFileHandler = async () => {
    setDownloadButtonDisabled(true);
    if (typeof window.ReactNativeWebView !== "undefined") {
      if (+settingsContext.outputFormat === 0) {
        try {
          const data = prepareExportDataForCSV();
          const csv = generateCSV(data);
          const url = await makeLink(csv, "CSV");
          openExternalUrl(url);
        } catch (error) {
          alert("Failed generating CSV download link for XUMM.");
          setDownloadButtonDisabled(false);
        }
      } else if (+settingsContext.outputFormat === 1) {
        try {
          const data = prepareExportDataForJSON();
          const url = await makeLink(data, "JSON");
          openExternalUrl(url);
        } catch (error) {
          alert("Failed generating JSON download link for XUMM.");
          setDownloadButtonDisabled(false);
        }
      }
    } else {
      if (+settingsContext.outputFormat === 0) {
        try {
          const data = prepareExportDataForCSV();
          const csv = generateCSV(data);
          const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
          });
          saveAs(blob, ottContext.account + ".csv");
        } catch (error) {
          alert("Failed generating CSV download link for web");
          setDownloadButtonDisabled(false);
        }
      } else if (+settingsContext.outputFormat === 1) {
        try {
          const data = prepareExportDataForJSON();
          const blob = new Blob([data], {
            type: "text/json;charset=utf-8;",
          });
          saveAs(blob, ottContext.account + ".json");
        } catch (error) {
          alert("Failed generating JSON download link for web");
          setDownloadButtonDisabled(false);
        }
      }
    }
    setDownloadButtonDisabled(false);
  };

  const makeLink = async (content, fileType) => {
    const payload = {
      content: content,
      fileType: fileType,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const makefileApiURL = process.env.REACT_APP_MAKEFILE_API;
    const response = await fetch(makefileApiURL, requestOptions);
    const data = await response.json();
    return data.file;
  };

  const closeModal = () => {
    setCsvString();
  };

  const openExternalUrl = (url) => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        command: "openBrowser",
        url: url,
      })
    );
  };

  const formatChangeHandler = (e) => {
    settingsContext.setOutputFormat(e.target.value);
  };

  const delimiterChangeHandler = (e) => {
    settingsContext.setDelimiter(e.target.value);
  };

  const includeHeaderChangeHandler = () => {
    settingsContext.toggleIncludeHeader();
  };

  return (
    <main>
      <PageHeader title="app.export.title" defaultMessage="Export" />

      <div className="export-page">
        <div className="form-group">
          <label>
            <FormattedMessage
              id="app.export.label.format"
              defaultMessage="Delimiter"
            />
            <HelpIcon
              title="app.export.help.format.title"
              content="app.export.help.format.description"
            />
          </label>
          <div>
            <select
              value={settingsContext.outputFormat}
              onChange={formatChangeHandler}
            >
              {settingsContext.getSupportedFormats().map((f, index) => (
                <option key={index} value={f.key}>
                  {f.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        {+settingsContext.outputFormat === 0 && (
          <div className="form-group">
            <label>
              <FormattedMessage
                id="app.export.label.delimiter"
                defaultMessage="Delimiter"
              />
              <HelpIcon
                title="app.export.help.delimiter.title"
                content="app.export.help.delimiter.description"
              />
            </label>
            <div>
              <select
                value={settingsContext.delimiter}
                onChange={delimiterChangeHandler}
              >
                {settingsContext.getSupportedDelimiters().map((d, index) => (
                  <option key={index} value={d.key}>
                    {d.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {+settingsContext.outputFormat === 0 && (
          <div className="form-group">
            <label>
              <FormattedMessage
                id="app.export.label.header"
                defaultMessage="Include header in output"
              />
              <HelpIcon
                title="app.export.help.header.title"
                content="app.export.help.header.description"
              />
            </label>
            <div>
              <Switch
                checked={settingsContext.includeHeader}
                onChange={includeHeaderChangeHandler}
                onColor="rgb(59, 220, 150)"
                offColor="rgb(172, 177, 193)"
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>
            <FormattedMessage
              id="app.export.label.fields"
              defaultMessage="Fields"
            />
            <HelpIcon
              title="app.export.help.fields.title"
              content="app.export.help.fields.description"
            />
          </label>
          <OutputFields headings={generateHeadings()} />
        </div>

        <div className="form-group buttons">
          <button
            disabled={downloadButtonDisabled}
            className="btn btn-primary"
            onClick={saveToFileHandler}
          >
            <FormattedMessage
              id="app.export.btn.save"
              defaultMessage="Save to file"
            />
          </button>
          <button className="btn btn-secondary" onClick={copyToClipboard}>
            <FormattedMessage
              id="app.export.btn.copy"
              defaultMessage="Copy to clipboard"
            />
          </button>
        </div>
      </div>

      {csvString && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FormattedMessage
                    id="app.export.copied.title"
                    defaultMessage="Copied to clipboard"
                  />
                </h5>
                <button onClick={closeModal} className="btn" aria-label="Close">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="csv-output">
                  <code>{csvString}</code>
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Export;
