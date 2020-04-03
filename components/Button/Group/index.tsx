import React from "react";
import "./index.scss";

export type Props = {
    [otherProp: string]: any,
    className?: string,
};

const ButtonGroup = ({ className, ...props }: Props) => {
    const classNames = className ? className.split(" ") : [];
    classNames.push("button-group");

    return (
        <div {...props} className={classNames.join(" ")} />
    );
};

export default ButtonGroup;
