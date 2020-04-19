import React, { useRef } from "react";
import "./message-box.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show?: boolean;
  onCancel?: () => void;
}

const MessageBox = ({ className = "", show = true, onCancel, ...props }: Props) => {
  const containerDisplay = show ? "block" : "none";
  const containerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const containerStyle = {
    display: containerDisplay
  };

  const containerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === containerRef.current) {
      onCancel?.();
    }
  };

  className = `message-box${className && ` ${className}`}`;

  return (
    <div className="message-box-container" ref={containerRef} style={containerStyle} onClick={containerOnClick}>
      <div className={className} {...props} />
    </div>
  );
};

export default MessageBox;
