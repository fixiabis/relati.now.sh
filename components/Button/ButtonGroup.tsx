import React from "react";
import "./button-group.scss";

export type Props = {
	className?: string,
	[otherPropName: string]: any,
};

const ButtonGroup = ({ className: buttonGroupClassName = "", ...props }: Props) => {
	buttonGroupClassName = buttonGroupClassName && ` ${buttonGroupClassName}`;
	return <div {...props} className={`button-group${buttonGroupClassName}`} />;
};

export default ButtonGroup;
