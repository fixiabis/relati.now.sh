import React from "react";

export type Props = {
  x: number,
  y: number,
  primary?: boolean,
  disabled?: boolean,
};

const SYMBOL_PATH = [
  "m 2.5 1.5",
  "l 1.5 2.5",
  "l  -3 0",
  "z",
].join(" ");

const SymbolD = ({ x, y, primary, disabled }: Props) => (
  primary
    ? (
      <>
        <path
          d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
          fill="none"
          stroke={disabled ? "#888" : "seagreen"}
          strokeWidth="1" />
        <path
          d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5" />
      </>
    )
    : (
      <path
        d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
        fill="none"
        stroke={disabled ? "#888" : "seagreen"}
        strokeWidth="0.6" />
    )
);

export default SymbolD;
