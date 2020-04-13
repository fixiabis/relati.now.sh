import React from "react";

import "./message-box.scss";

export type Props = {
  className?: string,
  show?: boolean;
  [otherPropName: string]: any,
};

const MessageBox = ({ className: messageBoxClassName = "", show: isMessageBoxShow = true, ...props }: Props) => {
  messageBoxClassName = `message-box${messageBoxClassName && ` ${messageBoxClassName}`}`;
  const messageBoxContainerDisplay = isMessageBoxShow ? "block" : "none";
  const messageBoxContainerStyle = { display: messageBoxContainerDisplay };

  return (
    <div className="message-box-container" style={messageBoxContainerStyle}>
      <div {...props} className={messageBoxClassName} />
    </div>
  );
};

export default MessageBox;
