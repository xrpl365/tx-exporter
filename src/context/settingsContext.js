import React, { useEffect, useReducer } from "react";

// Power settings drop downs
const supportedFormats = [
  { key: "0", value: "CSV" },
  { key: "1", value: "JSON" },
];

const supportedDelimiters = [
  { key: "0", value: "," },
  { key: "1", value: ";" },
  { key: "2", value: "|" },
];

const SettingsDefault = {
  pinAccount: true,
  showFee: false,
  txExpiry: 7,
  outputFormat: 0,
  delimiter: 0,
  includeHeader: true,
  fields: {
    txType: true,
    direction: true,
    date: true,
    currency: true,
    issuer: false,
    amount: true,
    isFee: true,
    fee: true,
    ledger: false,
    hash: false,
    sender: false,
    receiver: false,
    destinationTag: false,
    sourceTag: false,
  },
};

const SettingsContext = React.createContext({
  ...SettingsDefault,
  toggleFeeUsage: () => {},
  togglePinAccount: () => {},
  toggleIncludeHeader: () => {},
  setTxExpiry: () => {},
  setOutputFormat: () => {},
  setDelimiter: () => {},
  getSupportedDelimiters: () => {},
  getSupportedFormats: () => {},
  toggleOutputField: () => {},
});

const settingsReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FEE_USAGE":
      return {
        ...state,
        showFee: !state.showFee,
      };
    case "TOGGLE_PIN_ACCOUNT":
      return {
        ...state,
        pinAccount: !state.pinAccount,
      };
    case "TOGGLE_INCLUDE_HEADER":
      return {
        ...state,
        includeHeader: !state.includeHeader,
      };
    case "SET_TX_EXPIRY":
      return {
        ...state,
        txExpiry: action.val,
      };
    case "SET_OUTPUT_FORMAT":
      return {
        ...state,
        outputFormat: action.val,
      };
    case "SET_DELIMITER":
      return {
        ...state,
        delimiter: action.val,
      };
    case "TOGGLE_OUTPUT_FIELD":
      const f = {
        ...state.fields,
        ...(action.val === "TXTYPE" && { txType: !state.fields.txType }),
        ...(action.val === "DIRECTION" && {
          direction: !state.fields.direction,
        }),
        ...(action.val === "AMOUNT" && { amount: !state.fields.amount }),
        ...(action.val === "DATE" && { date: !state.fields.date }),
        ...(action.val === "CURRENCY" && { currency: !state.fields.currency }),
        ...(action.val === "ISSUER" && {
          issuer: !state.fields.issuer,
        }),
        ...(action.val === "ISFEE" && { isFee: !state.fields.isFee }),
        ...(action.val === "FEE" && { fee: !state.fields.fee }),
        ...(action.val === "LEDGER" && { ledger: !state.fields.ledger }),
        ...(action.val === "HASH" && { hash: !state.fields.hash }),
        ...(action.val === "SENDER" && { sender: !state.fields.sender }),
        ...(action.val === "RECEIVER" && { receiver: !state.fields.receiver }),
        ...(action.val === "DESTINATIONTAG" && {
          destinationTag: !state.fields.destinationTag,
        }),
        ...(action.val === "SOURCETAG" && {
          sourceTag: !state.fields.sourceTag,
        }),
      };

      return {
        ...state,
        fields: f,
      };
    case "RESTORE_SETTINGS":
      return action.val;
    default:
      return SettingsDefault;
  }
};

export const SettingsContextProvider = (props) => {
  const [settingsState, dispatchSettings] = useReducer(settingsReducer, SettingsDefault);

  // Context functions
  const toggleFeeUsage = () => {
    setStoredSettings({
      ...settingsState,
      showFee: !settingsState.showFee,
    });
    dispatchSettings({ type: "TOGGLE_FEE_USAGE" });
  };
  const togglePinAccount = () => {
    setStoredSettings({
      ...settingsState,
      pinAccount: !settingsState.pinAccount,
    });
    dispatchSettings({ type: "TOGGLE_PIN_ACCOUNT" });
  };
  const toggleIncludeHeader = () => {
    setStoredSettings({
      ...settingsState,
      includeHeader: !settingsState.includeHeader,
    });
    dispatchSettings({ type: "TOGGLE_INCLUDE_HEADER" });
  };
  const setTxExpiry = (txExpiry) => {
    setStoredSettings({ ...settingsState, txExpiry });
    dispatchSettings({ type: "SET_TX_EXPIRY", val: txExpiry });
  };
  const setOutputFormat = (outputFormat) => {
    setStoredSettings({ ...settingsState, outputFormat });
    dispatchSettings({ type: "SET_OUTPUT_FORMAT", val: outputFormat });
  };
  const setDelimiter = (delimiter) => {
    setStoredSettings({ ...settingsState, delimiter });
    dispatchSettings({ type: "SET_DELIMITER", val: delimiter });
  };

  // Output field management
  const toggleOutputField = (field) => {
    const f = {
      ...settingsState.fields,
      ...(field === "TXTYPE" && { txType: !settingsState.fields.txType }),
      ...(field === "DIRECTION" && {
        direction: !settingsState.fields.direction,
      }),
      ...(field === "AMOUNT" && { amount: !settingsState.fields.amount }),
      ...(field === "DATE" && { date: !settingsState.fields.date }),
      ...(field === "CURRENCY" && { currency: !settingsState.fields.currency }),
      ...(field === "ISSUER" && {
        issuer: !settingsState.fields.issuer,
      }),
      ...(field === "ISFEE" && { isFee: !settingsState.fields.isFee }),
      ...(field === "FEE" && { fee: !settingsState.fields.fee }),
      ...(field === "LEDGER" && { ledger: !settingsState.fields.ledger }),
      ...(field === "HASH" && { hash: !settingsState.fields.hash }),
      ...(field === "SENDER" && { sender: !settingsState.fields.sender }),
      ...(field === "RECEIVER" && { receiver: !settingsState.fields.receiver }),
      ...(field === "DESTINATIONTAG" && {
        destinationTag: !settingsState.fields.destinationTag,
      }),
      ...(field === "SOURCETAG" && {
        sourceTag: !settingsState.fields.sourceTag,
      }),
    };
    setStoredSettings({
      ...settingsState,
      fields: f,
    });
    dispatchSettings({ type: "TOGGLE_OUTPUT_FIELD", val: field });
  };

  // Manage storage backup/restore
  const getStoredSettings = () => {
    const s = localStorage.getItem("storedSettings");
    return s ? JSON.parse(s) : null;
  };
  const setStoredSettings = (s) => {
    localStorage.setItem("storedSettings", JSON.stringify(s));
  };

  // Provide data for drop downs
  const getSupportedFormats = () => {
    return supportedFormats;
  };
  const getSupportedDelimiters = () => {
    return supportedDelimiters;
  };
  const getSelectedDelimiter = () => supportedDelimiters.find((x) => +x.key === +settingsState.delimiter).value;

  useEffect(() => {
    const storedSettings = getStoredSettings();
    if (storedSettings) {
      dispatchSettings({ type: "RESTORE_SETTINGS", val: storedSettings });
    }
  }, []);

  const contextValue = {
    showFee: settingsState.showFee,
    txExpiry: settingsState.txExpiry,
    pinAccount: settingsState.pinAccount,
    outputFormat: settingsState.outputFormat,
    delimiter: settingsState.delimiter,
    includeHeader: settingsState.includeHeader,
    fields: {
      txType: settingsState.fields.txType,
      direction: settingsState.fields.direction,
      date: settingsState.fields.date,
      currency: settingsState.fields.currency,
      issuer: settingsState.fields.issuer,
      amount: settingsState.fields.amount,
      isFee: settingsState.fields.isFee,
      fee: settingsState.fields.fee,
      ledger: settingsState.fields.ledger,
      hash: settingsState.fields.hash,
      sender: settingsState.fields.sender,
      receiver: settingsState.fields.receiver,
      destinationTag: settingsState.fields.destinationTag,
      sourceTag: settingsState.fields.sourceTag,
    },
    toggleFeeUsage: toggleFeeUsage,
    togglePinAccount: togglePinAccount,
    toggleIncludeHeader: toggleIncludeHeader,
    setTxExpiry: setTxExpiry,
    setOutputFormat: setOutputFormat,
    setDelimiter: setDelimiter,
    getSupportedDelimiters: getSupportedDelimiters,
    getSupportedFormats: getSupportedFormats,
    getSelectedDelimiter: getSelectedDelimiter,
    toggleOutputField: toggleOutputField,
  };

  return <SettingsContext.Provider value={contextValue}>{props.children}</SettingsContext.Provider>;
};

export default SettingsContext;
