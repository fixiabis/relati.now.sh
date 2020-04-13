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
  const [lineLength, pathDefinition] = linePath.reduce(([lineLength, pathDefinition], [x, y], i) => {
    if (i !== 0) {
      const [previousLinePathX, previousLinePathY] = linePath[i - 1];
      const deltaX = Math.abs(previousLinePathX - x);
      const deltaY = Math.abs(previousLinePathY - y);
      const isSlashLine = deltaX > 0 && deltaY > 0;

      if (isSlashLine) {
        lineLength = parseFloat((lineLength + 1.41421).toFixed(5));
      }
      else {
        lineLength++;
      }

      pathDefinition += `L ${x * 5 + 2.5} ${y * 5 + 2.5}`;
    }
    else {
      pathDefinition += `M ${x * 5 + 2.5} ${y * 5 + 2.5}`;
    }

    return [lineLength, pathDefinition];
  }, [0, ""]);

  pathClassName = `draw-line length-${lineLength}${pathClassName && ` ${pathClassName}`}`;

  return (
    <path
      {...props}
      d={pathDefinition}
      className={pathClassName}
      fill="none"
      stroke={color}
      strokeWidth="0.6" />
  );
};

export default DrawLine;
