import React from "react";
import ButtonGroup from "./ButtonGroup";
import "./button.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const Button = ({ className = "", ...props }: Props) => {
  className = `button${className && ` ${className}`}`;
  return <div className={className} {...props} />;
};

Button.Group = ButtonGroup;

export default Button;
