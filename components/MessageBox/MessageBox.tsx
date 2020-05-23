import React from "react";
import Box, { Props as BoxProps } from "../Box";
import "./message-box.scss";

export interface Props extends BoxProps {
}

const MessageBox = ({ className = "", ...props }: Props) => {
  className = `message-box${className && ` ${className}`}`;
  return <Box className={className} {...props} />;
};

export default MessageBox;
