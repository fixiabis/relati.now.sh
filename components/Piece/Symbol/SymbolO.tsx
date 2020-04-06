import React from "react";

export type Props = {
  x: number,
  y: number,
  isInitial?: boolean,
  isDisabled?: boolean,
};

const SYMBOL_PATH = "m 0 -1.5, a 1.5 1.5, 0 0 1, 0 3, a 1.5 1.5, 0 0 1, 0 -3";

const SymbolO = ({ x, y, isInitial, isDisabled }: Props) => (
  isInitial
    ? (
      <>
        <path
          d={`M ${x * 5 + 2.5} ${y * 5 + 2.5} ${SYMBOL_PATH}`}
          fill="none"
          stroke={isDisabled ? "#888" : "crimson"}
          strokeWidth="1" />
        <path
          d={`M ${x * 5 + 2.5} ${y * 5 + 2.5} ${SYMBOL_PATH}`}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5" />
      </>
    )
    : (
      <path
        d={`M ${x * 5 + 2.5} ${y * 5 + 2.5} ${SYMBOL_PATH}`}
        fill="none"
        stroke={isDisabled ? "#888" : "crimson"}
        strokeWidth="0.6" />
    )
);

export default SymbolO;
