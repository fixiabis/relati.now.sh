import React from "react";

import "./index.scss";

export type Props = {
  x: number,
  y: number,
  color: string,
  emphasis?: boolean,
};

const SYMBOL_PATH = `
  m  2  1 h -1 v  1
  m  0  1 v  1 h  1
  m  1  0 h  1 v -1
  m  0 -1 v -1 h -1
`;

const Focus = ({ x, y, color, emphasis = true }: Props) => (
  <path
    d={`M ${x * 5} ${y * 5} ${SYMBOL_PATH}`}
    fill="none"
    stroke={color}
    strokeWidth="0.4px"
    className={emphasis ? "piece-emphasis" : undefined} />
);

export default Focus;
