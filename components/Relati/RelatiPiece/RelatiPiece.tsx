import React from "react";
import { SymbolColor, SymbolRoute } from "./utils";
import { RelatiPiece as Piece } from "../../../libs/RelatiGame";

export interface Props extends React.SVGProps<SVGPathElement> {
  x: number;
  y: number;
  symbol: Piece["symbol"];
  primary?: boolean;
  disabled?: boolean;
}

const RelatiPiece = ({ x, y, symbol, primary, disabled, ...props }: Props) => {
  const definition = `M ${x * 5} ${y * 5} ${SymbolRoute[symbol]}`;
  const color = disabled ? "#888" : SymbolColor[symbol];

  if (primary) {
    return (
      <>
        <path d={definition} fill="none" stroke={color} strokeWidth="1" {...props} />
        <path d={definition} fill="none" stroke="#f2f2f2" strokeWidth="0.5" {...props} />
      </>
    );
  }
  else {
    return (
      <path d={definition} fill="none" stroke={color} strokeWidth="0.6" {...props} />
    );
  }
};

export default RelatiPiece;
