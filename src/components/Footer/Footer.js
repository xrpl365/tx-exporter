import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCloudDownload,
  faCog,
  faListAlt,
} from "@fortawesome/pro-light-svg-icons";
import { FormattedMessage } from "react-intl";

function Footer(props) {
  const { currentPage } = props;
  const showTransactions = () => {
    props.pageChange("Main");
  };
  const showFilters = () => {
    props.pageChange("Filters");
  };
  const showExport = () => {
    props.pageChange("Export");
  };
  const showSettings = () => {
    props.pageChange("Settings");
  };

  return (
    <footer>
      <section>
        <button
          className={`btn f-icon ${currentPage === "Main" ? "active" : ""}`}
          onClick={showTransactions}
        >
          <FontAwesomeIcon icon={faListAlt} />
          <div className="icon-text">
            <FormattedMessage
              id="app.footer.transactions"
              defaultMessage="Transactions"
            />
          </div>
        </button>

        <button
          className={`btn f-icon filter-icon ${
            currentPage === "Filters" ? "active" : ""
          }`}
          onClick={showFilters}
        >
          <FontAwesomeIcon icon={faFilter} />
          <div className="icon-text">
            <FormattedMessage
              id="app.footer.filters"
              defaultMessage="Filters"
            />
          </div>
        </button>

        <button
          className={`btn f-icon ${currentPage === "Export" ? "active" : ""}`}
          onClick={showExport}
        >
          <FontAwesomeIcon icon={faCloudDownload} />
          <div className="icon-text">
            <FormattedMessage id="app.footer.export" defaultMessage="Export" />
          </div>
        </button>

        <button
          className={`btn f-icon ${currentPage === "Settings" ? "active" : ""}`}
          onClick={showSettings}
        >
          <FontAwesomeIcon icon={faCog} />
          <div className="icon-text">
            <FormattedMessage
              id="app.footer.settings"
              defaultMessage="Settings"
            />
          </div>
        </button>
      </section>
    </footer>
  );
}

export default Footer;
