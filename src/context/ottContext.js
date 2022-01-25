import React, { useEffect, useReducer } from "react";
import { XummSdkJwt } from "xumm-sdk";
import { IntlProvider } from "react-intl";
import English from "../lang/en.json";
import French from "../lang/fr.json";

// Power language settings drop downs
const supportedLanguages = [
  { key: "en", value: "English", lib: English },
  { key: "fr", value: "French", lib: French },
];

const getSupportedLanguages = () => {
  return supportedLanguages;
};

const getLanguage = (l) => {
  const selectedLanguage = supportedLanguages.find((x) => x.key === l);
  if (selectedLanguage) return selectedLanguage.lib;
  return English;
};

const OTTDefault = {
  account: null,
  currency: null,
  lang: English,
  locale: "en",
  style: "dark",
};

const OTTContext = React.createContext({
  ...OTTDefault,
  setLanguage: () => {},
  getSupportedLanguages: () => {},
  setOTT: () => {},
  clearOTT: () => {},
});

const ottReducer = (state, action) => {
  switch (action.type) {
    case "NEW_OTT":
      return {
        account: action.val.account,
        currency: action.val.currency,
        lang: getLanguage(action.val.locale),
        locale: action.val.locale,
        style: action.val.style,
      };
    case "LOCALE_UPDATE":
      return {
        ...state,
        locale: action.val,
        lang: getLanguage(action.val),
      };
    case "CLEAR_OTT":
      return OTTDefault;
    default:
      return OTTDefault;
  }
};

export const OTTContextProvider = (props) => {
  const [ottState, dispatchOTT] = useReducer(ottReducer, OTTDefault);

  useEffect(() => {
    try {
      const sdk = new XummSdkJwt(process.env.REACT_APP_XUMM_API_KEY);
      sdk
        .getOttData()
        .then((c) => {
          /* DEBUG */
          if (process.env.REACT_APP_RADDRESS !== "") {
            c.account = process.env.REACT_APP_RADDRESS;
          }
          dispatchOTT({ type: "NEW_OTT", val: c });
        })
        .catch((e) => {
          throw e;
        });
    } catch (e) {
      console.log("Error with API key, report to administrator.", e);
    }
  }, []);

  const setOTT = (ott) => {
    dispatchOTT({ type: "NEW_OTT", val: ott });
  };

  const clearOTT = () => {
    dispatchOTT({ type: "CLEAR_OTT" });
  };

  const setLanguage = (l) => {
    dispatchOTT({ type: "LOCALE_UPDATE", val: l });
  };

  const contextValue = {
    account: ottState.account,
    currency: ottState.currency,
    lang: ottState.lang,
    locale: ottState.locale,
    style: ottState.style,
    setLanguage: setLanguage,
    getSupportedLanguages: getSupportedLanguages,
    setOTT: setOTT,
    clearOTT: clearOTT,
  };

  return (
    <OTTContext.Provider value={contextValue}>
      <IntlProvider messages={ottState.lang} locale={ottState.locale}>
        {props.children}
      </IntlProvider>
    </OTTContext.Provider>
  );
};

export default OTTContext;
