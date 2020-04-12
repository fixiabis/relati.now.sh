import React from "react";

import "./draw-line.scss";
import { Coordinate } from "gridboard";

export type Props = {
  linePath: Coordinate[],
  color: string,
  className?: string,
  [otherPropName: string]: any,
};

const DrawLine = ({ linePath, color, className: pathClassName = "", ...props }: Props) => {
  pathClassName = pathClassName && ` ${pathClassName}`;

  let lineLength = 0;

  const pathDefinition = linePath.map(([x, y], i) => {
    if (i !== 0) {
      const previousLinePath = linePath[i - 1];
      const [pX, pY] = previousLinePath;

      if (Math.abs(pX - x) && Math.abs(pY - y)) {
        lineLength = parseFloat((lineLength + 1.41421).toFixed(5));
      }
      else {
        lineLength++;
      }
    }

    return `${i === 0 ? "M" : "L"} ${x * 5 + 2.5} ${y * 5 + 2.5}`;
  }).join(" ");

  return (
    <path
      {...props}
      d={pathDefinition}
      className={`draw-line length-${lineLength}${pathClassName}`}
      fill="none"
      stroke={color}
      strokeWidth="0.6" />
  );
};

export default DrawLine;
