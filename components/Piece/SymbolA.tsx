import React from "react";

export type Props = {
  x: number,
  y: number,
  primary?: boolean,
  disabled?: boolean,
};

const SYMBOL_PATH = [
  "m  1.0734152255572698  2.036474508437579",
  "l  2.853169548885461   0.0000000000000003",
  "l -2.3082626528814405  1.6770509831248415",
  "l  0.8816778784387098 -2.7135254915624207",
  "l  0.8816778784387105  2.7135254915624207",
  "z",
].join(" ");

const SymbolA = ({ x, y, primary, disabled }: Props) => (
  primary
    ? (
      <>
        <path
          d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
          fill="none"
          stroke={disabled ? "#888" : "purple"}
          strokeWidth="1" />
        <path
          d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.3" />
      </>
    )
    : (
      <path
        d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
        fill="none"
        stroke={disabled ? "#888" : "purple"}
        strokeWidth="0.4" />
    )
);

export default SymbolA;
