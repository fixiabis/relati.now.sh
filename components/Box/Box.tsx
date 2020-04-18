import React from "react";
import "./box.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show?: boolean;
}

const Box = ({ className = "", show = true, ...props }: Props) => {
  const containerDisplay = show ? "block" : "none";

  const containerStyle = {
    display: containerDisplay
  };

  className = `box${className && ` ${className}`}`;

  return (
    <div className="box-container" style={containerStyle}>
      <div className={className} {...props} />
    </div>
  );
};

export default Box;
