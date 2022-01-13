import React from "react";
import { FormattedMessage } from "react-intl";

function PageHeader(props) {
  return (
    <div className="page-title">
      <FormattedMessage
        id={props.title}
        defaultMessage={props.defaultMessage}
      />
    </div>
  );
}

export default PageHeader;
