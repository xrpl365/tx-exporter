import React, { useContext } from "react";

import OTTContext from "../../context/ottContext";

function XummHeader(props) {
  const ottContext = useContext(OTTContext);

  const clearOTT = () => {
    ottContext.clearOTT();
    props.clearOTT("OTT");
  };

  return (
    typeof window.ReactNativeWebView === "undefined" && (
      <div className="xumm-header">
        <span>Transaction Explorer</span>
        {props.currentPage !== "OTT" && (
          <button onClick={clearOTT} className="btn btn-mono">
            Switch
          </button>
        )}
      </div>
    )
  );
}

export default XummHeader;
