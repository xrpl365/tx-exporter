import React from "react";
import ReactDOM from "react-dom";
import "dotenv/config";
import { OTTContextProvider } from "./context/ottContext";

import App from "./App";

ReactDOM.render(
  <OTTContextProvider>
    <App />
  </OTTContextProvider>,
  document.getElementById("root")
);
