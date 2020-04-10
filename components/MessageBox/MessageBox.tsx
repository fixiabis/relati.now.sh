import React from "react";

import "./message-box.scss";

export type Props = {
  className?: string,
  show?: boolean;
  [otherPropName: string]: any,
};

const MessageBox = ({ className = "", show = true, ...props }: Props) => {
  return (
    <div className="message-box-container" style={{ display: show ? "block" : "none" }}>
      <div {...props} className={`message-box${className && ` ${className}`}`} />
    </div>
  );
};

export default MessageBox;
