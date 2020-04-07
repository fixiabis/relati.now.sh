import React from "react";

export type Props = {
  x: number,
  y: number,
  primary?: boolean,
  disabled?: boolean,
};

const SYMBOL_PATH = `
  m 1 1
  l 3 3
  m 0 -3
  l -3 3
`;

const SymbolX = ({ x, y, primary, disabled }: Props) => (
  primary
    ? (
      <>
        <path
          d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
          fill="none"
          stroke={disabled ? "#888" : "royalblue"}
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
        stroke={disabled ? "#888" : "royalblue"}
        strokeWidth="0.6" />
    )
);

export default SymbolX;
