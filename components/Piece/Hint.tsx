import React from "react";
import { PiecePath } from "./utils";

export type Props = {
  x: number,
  y: number,
  color: string,
  opacity?: number,
};

const Hint = ({ x, y, color, opacity = 1 }: Props) => (
  <path
    d={`M ${x * 5} ${y * 5} ${PiecePath.Hint}`}
    opacity={opacity}
    fill={color} />
);

export default Hint;
