import React from "react";

import "./index.scss";

export type Props = {
	className?: string,
	[otherPropName: string]: any,
};

const ButtonGroup = ({ className = "", ...props }: Props) => {
	return (
		<div {...props} className={`button-group${className && ` ${className}`}`} />
	);
};

export default ButtonGroup;
