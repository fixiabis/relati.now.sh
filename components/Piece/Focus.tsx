import React from "react";

import "./index.scss";
import { PieceRoute } from "./utils";

export type Props = {
  x: number,
  y: number,
  color: string,
  emphasis?: boolean,
};

const Focus = ({ x, y, color: pathColor, emphasis = true }: Props) => {
  const pathDefinition = `M ${x * 5} ${y * 5} ${PieceRoute.Focus}`;
  const pathPosition = `${x * 5}px ${y * 5}px`;
  const pathStyle = { transformOrigin: pathPosition };
  const pathClassName = emphasis ? "piece-emphasis" : undefined;

  return (
    <path
      d={pathDefinition}
      fill="none"
      stroke={pathColor}
      strokeWidth="0.4px"
      className={pathClassName}
      style={pathStyle} />
  );
};

export default Focus;
