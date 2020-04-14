import React from "react";
import "./button-group.scss";

export type Props = {
	className?: string,
	[otherPropName: string]: any,
};

const ButtonGroup = ({ className = "", ...props }: Props) => {
	className = `button-group${className && ` ${className}`}`;
	return <div className={className} {...props} />;
};

export default ButtonGroup;
