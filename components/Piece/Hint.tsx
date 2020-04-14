import React from "react";
import { PieceRoute } from "./utils";

export type Props = {
  x: number,
  y: number,
  color: string,
  opacity?: number,
  [otherPropName: string]: any,
};

const Hint = ({ x, y, color, opacity = 1, ...props }: Props) => {
  const definition = `M ${x * 5} ${y * 5} ${PieceRoute.Hint}`;
  return <path d={definition} fill={color} fillOpacity={opacity} {...props} />;
};

export default Hint;
