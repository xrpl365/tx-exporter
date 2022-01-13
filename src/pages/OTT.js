import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import OTTContext from "../context/ottContext";

import English from "../lang/en.json";

import PageHeader from "../components/Shared/PageHeader";
import HelpIcon from "../components/HelpIcon/HelpIcon";

function OTT(props) {
  const ottContext = useContext(OTTContext);
  const [account, setAccount] = useState("");

  const accountChangeHandler = (e) => {
    setAccount(e.target.value);
  };

  const setOTT = (e) => {
    ottContext.setOTT({
      account: account !== "" ? account : null,
      currency: "USD",
      lang: English,
      locale: "en",
      style: "LIGHT",
    });

    props.closePage();
  };

  return (
    <main className="ott-settings">
      <PageHeader title="app.ott.title" defaultMessage="Account" />

      <div className="form-group">
        <label>
          <FormattedMessage id="app.ott.raddress" defaultMessage="rAddress" />
          <HelpIcon
            title="app.ott.help.raddress.title"
            content="app.ott.help.raddress.description"
          />
        </label>
        <input type="text" value={account} onChange={accountChangeHandler} />
      </div>

      <div className="form-group">
        <button className="btn btn-primary" onClick={setOTT}>
          Explore
        </button>
      </div>
    </main>
  );
}

export default OTT;
