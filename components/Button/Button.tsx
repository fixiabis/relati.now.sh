import React from "react";
import ButtonGroup from "./ButtonGroup";
import "./button.scss";

export type Props = {
  className?: string,
  [otherPropName: string]: any,
};

const Button = ({ className: buttonClassName = "", ...props }: Props) => {
  buttonClassName = buttonClassName && ` ${buttonClassName}`;
  return <div {...props} className={`button${buttonClassName}`} />;
};

Button.Group = ButtonGroup;

export default Button;
