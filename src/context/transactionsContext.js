import React, { useEffect, useReducer, useContext, useState } from "react";
import txexplorer from "../xrpl-tx-explorer";

import OTTContext from "./ottContext";
import SettingsContext from "./settingsContext";

// Helpers
const storedTransactions = (a, lsd, e) => {
  if (!lsd) return [];

  const test = new Date(lsd);
  test.setDate(lsd.getDate() + +e);
  if (test.getTime() < new Date().getTime()) {
    return [];
  }

  const st = localStorage.getItem("account_" + a);
  if (!st) {
    return [];
  }

  return JSON.parse(st);
};

const getLastScanDate = (a) => {
  const d = localStorage.getItem("lastScanDate_" + a);
  if (!d) return null;
  return new Date(d);
};

const setLastScanDate = (a, lsd) => {
  localStorage.setItem("lastScanDate_" + a, lsd);
};

const makeDate = (d) => {
  const year = parseInt(d.substring(0, 4));
  const month = parseInt(d.substring(5, 7) - 1);
  const day = parseInt(d.substring(8, 10));
  const hour = parseInt(d.substring(11, 13));
  const minute = parseInt(d.substring(14, 16));
  const second = parseInt(d.substring(17, 19));
  return new Date(year, month, day, hour, minute, second);
};

// Defaults
const txDefault = {
  allTransactions: [],
  filteredTransactions: [],
  lastScanDate: null,
  fetchingTransactions: false,
  filters: {
    startDate: "",
    endDate: "",
    currency: "",
    direction: "",
    txType: "",
  },
};

const TransactionsContext = React.createContext({
  ...txDefault,
  setFilters: () => {},
  filterTransactions: () => {},
  getCurrencies: () => {},
  refresh: () => {},
});

const txReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TX":
      return {
        ...state,
        allTransactions: [...state.allTransactions, action.val],
        filteredTransactions: [...state.filteredTransactions, action.val],
      };
    case "RESTORE_TXS":
      return {
        ...state,
        allTransactions: action.val,
        filteredTransactions: action.val,
      };
    case "CLEAR_TX":
      return {
        ...state,
        allTransactions: [],
        filteredTransactions: [],
        lastScanDate: null,
      };
    case "SET_LAST_SCAN_DATE":
      return {
        ...state,
        lastScanDate: action.val,
      };
    case "FETCH_TX_START":
      return {
        ...state,
        fetchingTransactions: true,
      };
    case "FETCH_TX_STOP":
      return {
        ...state,
        fetchingTransactions: false,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: action.val,
      };
    case "SET_FILTERED_TRANSACTIONS":
      return {
        ...state,
        filteredTransactions: action.val,
      };
    default:
      return txDefault;
  }
};

export const TransactionsContextProvider = (props) => {
  const ottContext = useContext(OTTContext);
  const settingsContext = useContext(SettingsContext);
  const [txState, dispatchTx] = useReducer(txReducer, txDefault);
  const [txRefresh, setTxRefresh] = useState(1);
  const rAddress =
    process.env.REACT_APP_RADDRESS === ""
      ? ottContext.account
      : process.env.REACT_APP_RADDRESS;

  useEffect(() => {
    const fetchTransactions = async (account) => {
      const lastScanDate = getLastScanDate(rAddress);
      const tx = storedTransactions(
        rAddress,
        lastScanDate,
        settingsContext.txExpiry
      );
      if (tx.length > 0) {
        console.log(
          "Restoring transactions from localStorage: account_" + rAddress
        );
        dispatchTx({ type: "RESTORE_TXS", val: tx });
        dispatchTx({
          type: "SET_LAST_SCAN_DATE",
          val: lastScanDate.toISOString().replace(/T/, " ").replace(/\..+/, ""),
        });
      } else {
        // Store flag to show getting transactions
        dispatchTx({ type: "FETCH_TX_START" });

        dispatchTx({
          type: "SET_LAST_SCAN_DATE",
          val: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        });

        console.log("Fetch transactions from XRPL");
        const tempTransactions = [];
        await txexplorer(
          account,
          (tx) => {
            tempTransactions.push(tx);
            dispatchTx({ type: "ADD_TX", val: tx });
          },
          true
        );

        // Cache the ledger output
        try {
          localStorage.setItem(
            "account_" + rAddress,
            JSON.stringify(tempTransactions)
          );
        } catch (error) {
          console.log(
            "Transactions size exceeds the storage limit of this device."
          );
        }

        // Update last scan date of ledger
        const newScanDate = new Date();
        setLastScanDate(rAddress, newScanDate);

        dispatchTx({
          type: "SET_LAST_SCAN_DATE",
          val: newScanDate.toISOString().replace(/T/, " ").replace(/\..+/, ""),
        });

        // Stop showing spinner
        dispatchTx({ type: "FETCH_TX_STOP" });
      }
    };

    try {
      if (rAddress && txRefresh > 0) {
        fetchTransactions(rAddress);
      }
    } catch (error) {
      console.log("OTT is missing");
    }

    return () => {
      dispatchTx({ type: "CLEAR_TX" });
    };
  }, [rAddress, settingsContext.txExpiry, txRefresh]);

  const setFilters = (filters) => {
    dispatchTx({ type: "SET_FILTERS", val: filters });
    //filterTransactions(filters);
  };

  const filterTransactions = () => {
    // Extract filters
    let filtered = txState.allTransactions.slice();
    const { startDate, endDate, currency, direction, txType } = txState.filters;

    if (startDate) {
      filtered = filtered.filter(
        (f) => new Date(f.date).getTime() >= makeDate(startDate).getTime()
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (f) => new Date(f.date).getTime() <= makeDate(endDate).getTime()
      );
    }
    if (currency) {
      filtered = filtered.filter((f) => currency === f.currency);
    }
    if (direction) {
      filtered = filtered.filter((f) => direction === f.direction);
    }
    if (txType) {
      filtered = filtered.filter((f) => txType === f.txtype);
    }
    if (!settingsContext.showFee) {
      filtered = filtered.filter((tx) => tx.is_fee !== 1);
    }
    return filtered;
    //dispatchTx({ type: "SET_FILTERED_TRANSACTIONS", val: filtered });
  };

  const getCurrencies = () => {
    return txState.allTransactions
      .map((x) => x.currency)
      .filter((value, index, self) => self.indexOf(value) === index);
  };

  const refresh = () => {
    localStorage.removeItem("lastScanDate_" + rAddress);
    setTxRefresh((state) => {
      return state + 1;
    });
  };

  const contextValue = {
    allTransactions: txState.allTransactions,
    filteredTransactions: txState.filteredTransactions,
    lastScanDate: txState.lastScanDate,
    fetchingTransactions: txState.fetchingTransactions,
    filters: txState.filters,
    setFilters: setFilters,
    filterTransactions: filterTransactions,
    getCurrencies: getCurrencies,
    refresh: refresh,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {props.children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
