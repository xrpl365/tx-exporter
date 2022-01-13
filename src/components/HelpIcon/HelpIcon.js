import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import ModalContext from "../../context/modalContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";

function HelpIcon(props) {
  const modalContext = useContext(ModalContext);

  const { title, content } = props;

  const showHelpModal = () => {
    modalContext.showModal(HelpModal);
  };

  const hideHelpModal = () => {
    modalContext.closeModal();
  };

  const HelpModal = () => {
    return (
      <>
        <div className="modal-header">
          <h5 className="modal-title">
            <FormattedMessage id={title} defaultMessage="Help Title" />
          </h5>
          <button onClick={hideHelpModal} className="btn" aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="help-body">
            <FormattedMessage
              id={content}
              defaultMessage="Help Description"
              values={{
                p: (...chunks) => <p>{chunks}</p>,
                strong: (...chunks) => <strong>{chunks}</strong>,
              }}
            />
          </div>
        </div>
        <div className="modal-footer"></div>
      </>
    );
  };

  return (
    <button tabIndex="0" onClick={showHelpModal}>
      <FontAwesomeIcon icon={faInfoCircle} />
    </button>
  );
}

export default HelpIcon;
