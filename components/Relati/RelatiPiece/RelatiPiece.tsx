import React from "react";
import { SymbolColor, SymbolRoute } from "./utils";
import { RelatiPiece as Piece } from "../../../libs/Relati";
import "./relati-piece.scss";

export interface Props extends React.SVGProps<SVGPathElement> {
  x: number;
  y: number;
  symbol: Piece["symbol"];
  primary?: boolean;
  disabled?: boolean;
  emphasized?: boolean;
}

const RelatiPiece = ({ x, y, symbol, primary, disabled, emphasized, className, ...props }: Props) => {
  const definition = `M ${x * 5} ${y * 5} ${SymbolRoute[symbol]}`;
  const color = disabled ? "#888" : SymbolColor[symbol];

  if (primary) {
    return (
      <>
        <path
          d={definition}
          fill="none"
          stroke={color}
          strokeWidth="1"
          className={className}
          {...props} />

        <path
          d={definition}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5"
          className={className}
          {...props} />
      </>
    );
  }
  else {
    className = emphasized ? `${className} relati-piece-emphasis` : undefined;

    const highlight = emphasized
      ? (
        <path
          d={definition}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
          className={className}
          {...props} />
      )
      : undefined;

    return (
      <>
        {highlight}
        <path
          d={definition}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          className={className}
          {...props} />
      </>
    );
  }
};

export default RelatiPiece;
