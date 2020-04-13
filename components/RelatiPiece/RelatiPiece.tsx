import React from "react";
import { SymbolColor, SymbolRoute } from "./utils";
import { RelatiPiece as Piece } from "../../libs/RelatiGame";

export type Props = {
  x: number,
  y: number,
  symbol: Piece["symbol"],
  primary?: boolean,
  disabled?: boolean,
};

const RelatiPiece = ({ x, y, symbol, primary, disabled }: Props) => {
  const pathDefinition = `M ${x * 5} ${y * 5} ${SymbolRoute[symbol]}`;
  const pathColor = disabled ? "#888" : SymbolColor[symbol];
  let piece;

  if (primary) {
    piece = (
      <>
        <path
          d={pathDefinition}
          fill="none"
          stroke={pathColor}
          strokeWidth="1" />
        <path
          d={pathDefinition}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5" />
      </>
    );
  }
  else {
    piece = (
      <path
        d={pathDefinition}
        fill="none"
        stroke={pathColor}
        strokeWidth="0.6" />
    );
  }

  return piece;
};

export default RelatiPiece;
