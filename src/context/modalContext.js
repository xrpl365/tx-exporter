import React, { useState } from "react";

const ModalContext = React.createContext({
  modal: null,
  showModal: () => {},
  closeModal: () => {},
});

export const ModalContextProvider = (props) => {
  const [modal, setModal] = useState();

  const showModal = (modal) => {
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  const contextValue = {
    modal: modal,
    showModal: showModal,
    closeModal: closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
