import React from "react";
import Header from "../components/Header/Header";
import Transactions from "../components/Transactions/Transactions";

function Main() {
  return (
    <main>
      <div className="temp-beta-note">
        App is in beta, please report all bugs
      </div>
      <Header />
      <Transactions />
    </main>
  );
}

export default Main;
