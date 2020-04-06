import React from "react";

import "./index.scss";

export type Props = {
  x: number,
  y: number,
  color: string,
};

const HighLight = ({ x, y, color }: Props) => (
  <path
    d={`
      M ${x * 5 + 1} ${y * 5 + 1} m  0  1 v -1 h  1
      M ${x * 5 + 1} ${y * 5 + 4} m  0 -1 v  1 h  1
      M ${x * 5 + 4} ${y * 5 + 1} m  0  1 v -1 h -1
      M ${x * 5 + 4} ${y * 5 + 4} m  0 -1 v  1 h -1
    `}
    fill="none"
    stroke={color}
    strokeWidth="0.4px"
    className="point-highlight" />
);

export default HighLight;
