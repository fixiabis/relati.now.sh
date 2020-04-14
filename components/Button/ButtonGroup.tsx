import React from "react";
import "./button-group.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const ButtonGroup = ({ className = "", ...props }: Props) => {
  className = `button-group${className && ` ${className}`}`;
  return <div className={className} {...props} />;
};

export default ButtonGroup;
