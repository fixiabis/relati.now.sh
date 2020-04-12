import React from "react";

import "./message-box.scss";

export type Props = {
  className?: string,
  show?: boolean;
  [otherPropName: string]: any,
};

const MessageBox = ({ className: messageBoxClassName = "", show = true, ...props }: Props) => {
  messageBoxClassName = messageBoxClassName && ` ${messageBoxClassName}`;
  const messageBoxContainerStyle = { display: show ? "block" : "none" };

  return (
    <div className="message-box-container" style={messageBoxContainerStyle}>
      <div {...props} className={`message-box${messageBoxClassName}`} />
    </div>
  );
};

export default MessageBox;
