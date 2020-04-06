import React from "react";

export type Props = {
  x: number,
  y: number,
  isInitial?: boolean,
  isDisabled?: boolean,
};

const SYMBOL_PATH = "m -1.5 -1.5, l 3 3, m 0 -3, l -3 3";

const SymbolX = ({ x, y, isInitial, isDisabled }: Props) => (
  isInitial
    ? (
      <>
        <path
          d={`M ${x * 5 + 2.5} ${y * 5 + 2.5} ${SYMBOL_PATH}`}
          fill="none"
          stroke={isDisabled ? "#888" : "royalblue"}
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
        stroke={isDisabled ? "#888" : "royalblue"}
        strokeWidth="0.6" />
    )
);

export default SymbolX;
