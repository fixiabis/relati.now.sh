import React from "react";
import { SymbolColor, SymbolPath } from "./utils";
import { RelatiPiece as Piece } from "../../libs/RelatiGame";

export type Props = {
  x: number,
  y: number,
  symbol: Exclude<Piece["symbol"], "">,
  primary?: boolean,
  disabled?: boolean,
};

const RelatiPiece = ({ x, y, symbol, primary, disabled }: Props) => (
  primary
    ? (
      <>
        <path
          d={`M ${x * 5} ${y * 5} ${SymbolPath[symbol]}`}
          fill="none"
          stroke={disabled ? "#888" : SymbolColor[symbol]}
          strokeWidth="1" />
        <path
          d={`M ${x * 5} ${y * 5} ${SymbolPath[symbol]}`}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5" />
      </>
    )
    : (
      <path
        d={`M ${x * 5} ${y * 5} ${SymbolPath[symbol]}`}
        fill="none"
        stroke={disabled ? "#888" : SymbolColor[symbol]}
        strokeWidth="0.6" />
    )
);

export default RelatiPiece;
