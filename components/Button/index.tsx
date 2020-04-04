import React from "react";

import "./index.scss";
import ButtonGroup from "./Group";

export type Props = {
  [otherPropName: string]: any,
  className?: string,
};

const Button = ({ className, ...props }: Props) => {
  const classNames = className ? className.split(" ") : [];
  classNames.push("button");

  return (
    <div {...props} className={classNames.join(" ")} />
  );
};

Button.Group = ButtonGroup;

export default Button;
