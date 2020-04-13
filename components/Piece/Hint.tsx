import React from "react";
import { PieceRoute } from "./utils";

export type Props = {
  x: number,
  y: number,
  color: string,
  opacity?: number,
};

const Hint = ({ x, y, color, opacity: pathOpacity = 1 }: Props) => {
  const pathDefinition = `M ${x * 5} ${y * 5} ${PieceRoute.Hint}`;
  return <path d={pathDefinition} opacity={pathOpacity} fill={color} />;
};

export default Hint;
