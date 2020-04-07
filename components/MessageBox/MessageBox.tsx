import React from "react";

import "./message-box.scss";

export type Props = {
  className?: string,
  [otherPropName: string]: any,
};

const MessageBox = ({ className = "", ...props }: Props) => {
  return (
    <div className="message-box-container">
      <div {...props} className={`message-box${className && ` ${className}`}`} />
    </div>
  );
};

export default MessageBox;
