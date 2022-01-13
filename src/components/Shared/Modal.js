import React, { useContext } from "react";
import ModalContext from "../../context/modalContext";

export default function Modal() {
  const modalContext = useContext(ModalContext);

  return (
    <>
      {modalContext.modal && (
        <>
          <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">{modalContext.modal}</div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </>
  );
}
