import React, { useRef } from "react";
import Box, { BoxProps } from "../Box";
import "./message-box.scss";

export interface Props extends BoxProps {
}

const MessageBox = ({ className = "", ...props }: Props) => {
  className = `message-box${className && ` ${className}`}`;
  return <Box className={className} {...props} />;
};

export default MessageBox;
