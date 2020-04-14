import React from "react";

import "./message-box.scss";

export type Props = {
  className?: string,
  show?: boolean;
  [otherPropName: string]: any,
};

const MessageBox = ({ className = "", show = true, ...props }: Props) => {
  const containerDisplay = show ? "block" : "none";

  const containerStyle = {
    display: containerDisplay
  };

  className = `message-box${className && ` ${className}`}`;

  return (
    <div className="message-box-container" style={containerStyle}>
      <div className={className} {...props} />
    </div>
  );
};

export default MessageBox;
