import React from "react";

import "./draw-line.scss";

export type Props = {
  path: { x: number, y: number }[],
  color: string,
  className?: string,
  [otherPropName: string]: any,
};

const DrawLine = ({ path, color, className = "", ...props }: Props) => {
  let delta = 0;

  return (
    <path
      {...props}
      d={path.map(({ x, y }, i) => {
        if (i !== 0) {
          if (Math.abs(path[i - 1].x - x) && Math.abs(path[i - 1].y - y)) {
            delta += 1.4142135623730951;
          }
          else {
            delta++;
          }
        }

        return `${i === 0 ? "M" : "L"} ${x * 5 + 2.5} ${y * 5 + 2.5}`;
      }).join(" ")}
      className={`draw-line length-${delta}${className && ` ${className}`}`}
      fill="none"
      stroke={color}
      strokeWidth="0.6" />
  );
};

export default DrawLine;
