import React from "react";

import "./Path.scss";

export type Props = {
  path: { x: number, y: number }[],
  color: string,
};

const Path = ({ path, color }: Props) => {
  let delta = 0;

  return (
    <path
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
      className={`draw-line length-${delta}`}
      fill="none"
      stroke={color}
      strokeWidth="0.6" />
  );
};

export default Path;
