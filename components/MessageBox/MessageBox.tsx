import React from "react";
import "./message-box.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show?: boolean;
}

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
