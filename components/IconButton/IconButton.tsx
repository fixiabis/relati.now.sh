import React from "react";
import Button from "../Button";

export type Props = {
    type: string,
    color: string,
    [otherPropName: string]: any,
};

const IconButton = ({ type, color, ...props }: Props) => {
    const buttonStyle = {
        backgroundColor: color,
        backgroundImage: `url(/icons/${type}.svg)`
    };

    return <Button {...props} style={buttonStyle} />;
};

export default IconButton;
