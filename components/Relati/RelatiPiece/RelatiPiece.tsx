import React from "react";
import { RelatiSymbolColor, RelatiSymbolRoute } from "./utils";
import "./relati-piece.scss";

export interface Props extends React.SVGProps<SVGPathElement> {
  x: number;
  y: number;
  color?: string;
  symbol: keyof typeof RelatiSymbolRoute;
  flicker?: boolean;
  primary?: boolean;
  disabled?: boolean;
  placement?: boolean;
  emphasized?: boolean;
}

const RelatiPiece = ({ x, y, symbol, color, primary, disabled, placement, emphasized, flicker, className = "" as string | undefined, style, ...props }: Props) => {
  const definition = `M ${x * 5} ${y * 5} ${RelatiSymbolRoute[symbol]}`;
  const position = `${x * 5}px ${y * 5}px`;
  color = disabled ? "#888" : color || RelatiSymbolColor[symbol];
  className = placement ? `${className && `${className} `}relati-piece-placement` : className;
  className = flicker ? `${className && `${className} `}relati-piece-flicker` : className;

  style = {
    ...style,
    transformOrigin: position
  };

  if (primary) {
    className = className || undefined;

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
    className = emphasized ? `${className && `${className} `}relati-piece-emphasized` : className;
    className = className || undefined;

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
