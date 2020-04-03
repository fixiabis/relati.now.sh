import React from "react";
import ButtonGroup from "./Group";
import "./index.scss";

export type Props = {
    [otherProp: string]: any,
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
