import React from "react";
import { SymbolColor, SymbolRoute } from "./utils";
import { RelatiPiece as Piece } from "../../../libs/Relati";
import "./relati-piece.scss";

export interface Props extends React.SVGProps<SVGPathElement> {
  x: number;
  y: number;
  color?: string;
  symbol: keyof typeof SymbolRoute;
  primary?: boolean;
  disabled?: boolean;
  placement?: boolean;
  emphasized?: boolean;
}

const RelatiPiece = ({ x, y, symbol, color, primary, disabled, placement, emphasized, className, style, ...props }: Props) => {
  const definition = `M ${x * 5} ${y * 5} ${SymbolRoute[symbol]}`;
  const position = `${x * 5}px ${y * 5}px`;
  color = disabled ? "#888" : color || SymbolColor[symbol];
  className = placement ? `${className} relati-piece-placement` : undefined;

  style = {
    ...style,
    transformOrigin: position
  };

  if (primary) {
    return (
      <>
        <path
          d={definition}
          fill="none"
          stroke={color}
          strokeWidth="1"
          className={className}
          style={style}
          {...props} />

        <path
          d={definition}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5"
          className={className}
          style={style}
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
          style={style}
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
          style={style}
          {...props} />
      </>
    );
  }
};

export default RelatiPiece;
