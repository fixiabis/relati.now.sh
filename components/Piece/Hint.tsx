import React from "react";
import { PieceRoute } from "./utilities";

export interface Props extends React.SVGProps<SVGPathElement> {
  x: number;
  y: number;
  color: string;
  opacity?: number;
}

const Hint = ({ x, y, color, opacity = 1, ...props }: Props) => {
  const definition = `M ${x * 5} ${y * 5} ${PieceRoute.Hint}`;
  return <path d={definition} fill={color} fillOpacity={opacity} {...props} />;
};

export default Hint;
