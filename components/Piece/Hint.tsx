import React from "react";

export type Props = {
  x: number,
  y: number,
  color: string,
  opacity?: number,
};

const SYMBOL_PATH = [
  "m 2.5 2",
  "a 0.5 0.5 0 0 1 0 1",
  "a 0.5 0.5 0 0 1 0 -1",
].join(" ");

const Hint = ({ x, y, color, opacity = 1 }: Props) => (
  <path
    d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
    opacity={opacity}
    fill={color} />
);

export default Hint;
