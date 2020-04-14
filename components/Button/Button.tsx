import React from "react";
import ButtonGroup from "./ButtonGroup";
import "./button.scss";

export type Props = {
  className?: string,
  [otherPropName: string]: any,
};

const Button = ({ className = "", ...props }: Props) => {
  className = `button${className && ` ${className}`}`;
  return <div className={className} {...props} />;
};

Button.Group = ButtonGroup;

export default Button;
