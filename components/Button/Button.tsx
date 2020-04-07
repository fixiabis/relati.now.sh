import React from "react";

import "./button.scss";
import ButtonGroup from "./ButtonGroup";

export type Props = {
  className?: string,
  [otherPropName: string]: any,
};

const Button = ({ className = "", ...props }: Props) => {
  return (
    <div {...props} className={`button${className && ` ${className}`}`} />
  );
};

Button.Group = ButtonGroup;

export default Button;
