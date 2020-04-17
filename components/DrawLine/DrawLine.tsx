import React from "react";

import "./draw-line.scss";
import { Coordinate } from "gridboard";

const RIGHT_TRIANGLE_HYPOTENUSE_LENGTH = 1.41421;

export interface Props extends React.SVGProps<SVGPathElement> {
  linePath: Coordinate[];
  color: string;
}

const DrawLine = ({ linePath, color, className = "", ...props }: Props) => {
  const [lineLength, pathDefinition] = linePath.reduce(([lineLength, pathDefinition], [x, y], i) => {
    if (i !== 0) {
      const [iX, iY] = linePath[i - 1];
      const deltaX = Math.abs(iX - x);
      const deltaY = Math.abs(iY - y);

      if (deltaX > 1) {
        throw RangeError(
          "座標移動超過1單位, " +
          `從(${iX}, ${iY}) 到 (${x}, ${y}), ` +
          `X軸移動了${deltaX}單位`
        );
      }
      else if (deltaY > 1) {
        throw RangeError(
          "座標移動超過1單位, " +
          `從(${iX}, ${iY}) 到 (${x}, ${y}), ` +
          `Y軸移動了${deltaY}單位`
        );
      }

      const isSlashLine = deltaX > 0 && deltaY > 0;

      if (isSlashLine) {
        lineLength = parseFloat((lineLength + RIGHT_TRIANGLE_HYPOTENUSE_LENGTH).toFixed(5));
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

  className = `draw-line draw-line-length-${lineLength}${className && ` ${className}`}`;

  return (
    <path
      d={pathDefinition}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="0.6"
      {...props} />
  );
};

export default DrawLine;
