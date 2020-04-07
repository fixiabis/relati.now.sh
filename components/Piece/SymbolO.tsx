import React from "react";

export type Props = {
  x: number,
  y: number,
  primary?: boolean,
  disabled?: boolean,
};

const SYMBOL_PATH = `
  m 2.5 1
  a 1.5 1.5 0 0 1 0 3
  a 1.5 1.5 0 0 1 0 -3
`;

const SymbolO = ({ x, y, primary, disabled }: Props) => (
  primary
    ? (
      <>
        <path
          d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
          fill="none"
          stroke={disabled ? "#888" : "crimson"}
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
        stroke={disabled ? "#888" : "crimson"}
        strokeWidth="0.6" />
    )
);

export default SymbolO;
