import React from "react";
import Button from "../Button";

export type Props = {
    type: string,
    color: string,
    [otherPropName: string]: any,
};

const IconButton = ({ type, color, ...props }: Props) => (
    <Button style={{
        backgroundColor: color,
        backgroundImage: `url(/icons/${type}.svg)`
    }} {...props} />
);

export default IconButton;
