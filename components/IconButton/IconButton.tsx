import React, { CSSProperties } from "react";
import Button from "../Button";

export type Props = {
    type: string,
    color: string,
    style?: CSSProperties,
    [otherPropName: string]: any,
};

const IconButton = ({ type, color, style, ...props }: Props) => {
    const imageUrl = `/icons/${type}.svg`;

    style = {
        ...style,
        backgroundColor: color,
        backgroundImage: `url(${imageUrl})`
    };

    return <Button style={style} {...props} />;
};

export default IconButton;
