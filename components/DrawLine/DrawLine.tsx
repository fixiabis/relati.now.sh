import React from "react";

import "./draw-line.scss";

export type Props = {
  linePath: { x: number, y: number }[],
  color: string,
  className?: string,
  [otherPropName: string]: any,
};

const DrawLine = ({ linePath, color, className: pathClassName = "", ...props }: Props) => {
  pathClassName = pathClassName && ` ${pathClassName}`;

  let lineLength = 0;

  const pathDefinition = linePath.map(({ x, y }, i) => {
    if (i !== 0) {
      if (Math.abs(linePath[i - 1].x - x) && Math.abs(linePath[i - 1].y - y)) {
        lineLength = parseFloat((lineLength + 1.41421).toFixed(5));
      }
      else {
        lineLength++;
      }
    }

    return `${i === 0 ? "M" : "L"} ${x * 5 + 2.5} ${y * 5 + 2.5}`;
  }).join(" ");

  console.log(`length-${lineLength}`);

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
