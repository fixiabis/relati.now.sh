import React from "react";
import Button from "../Button";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    type: string;
    color: string;
}

const IconButton = ({ type, color, style, ...props }: Props) => {
    const imageUrl = `/icons/light/${type}.svg`;

    style = {
        ...style,
        backgroundRepeat: "no-repeat",
        backgroundColor: color,
        backgroundImage: `url(${imageUrl})`
    };

    return <Button style={style} {...props} />;
};

export default IconButton;
