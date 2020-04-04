import React from "react";

import "./index.scss";
import ButtonGroup from "./Group";

export type Props = {
  className?: string,
  [otherPropName: string]: any,
};

const Button = ({ className = "", ...props }: Props) => {
  return (
    <div {...props} className={`button ${className}`} />
  );
};

Button.Group = ButtonGroup;

export default Button;
