import React, { useState, useEffect, useContext } from "react";
import { TransactionsContextProvider } from "./context/transactionsContext";
import { SettingsContextProvider } from "./context/settingsContext";
import { ModalContextProvider } from "./context/modalContext";

import OTTContext from "./context/ottContext";

import Loading from "./components/Shared/Loading";
import XummHeader from "./components/Shared/XummHeader";
import Main from "./pages/Main";
import Filters from "./pages/Filters";
import Export from "./pages/Export";
import Settings from "./pages/Settings";
import OTT from "./pages/OTT";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Shared/Modal";

import "./styles/app.scss";

function App() {
  const ottContext = useContext(OTTContext);
  const [currentPage, setCurrentPage] = useState();

  const { account: rAddress } = ottContext;

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const closePageHandler = () => {
    setCurrentPage("Main");
  };

  useEffect(() => {
    if (rAddress) {
      setCurrentPage("Main");
    } else {
      const isXummApp =
        new URLSearchParams(document.location.href).get("xAppStyle") || null;
      if (!isXummApp) {
        setCurrentPage("OTT");
      }
    }
    // console.log(localStorage.getItem("storedSettings"));
    // localStorage.removeItem("storedSettings");
  }, [rAddress]);

  const showCurrentPage = () => {
    switch (currentPage) {
      case "Main":
        return <Main />;
      case "Filters":
        return <Filters closePage={closePageHandler} />;
      case "Export":
        return <Export />;
      case "Settings":
        return <Settings closePage={closePageHandler} />;
      case "OTT":
        return <OTT closePage={closePageHandler} />;
      default:
        return <Loading />;
    }
  };

  return (
    <SettingsContextProvider>
      <TransactionsContextProvider>
        <ModalContextProvider>
          <XummHeader clearOTT={pageChangeHandler} currentPage={currentPage} />
          {showCurrentPage()}
          {currentPage !== "OTT" && rAddress && (
            <>
              <Footer
                pageChange={pageChangeHandler}
                currentPage={currentPage}
              />
            </>
          )}
          <Modal />
        </ModalContextProvider>
      </TransactionsContextProvider>
    </SettingsContextProvider>
  );
}

export default App;
