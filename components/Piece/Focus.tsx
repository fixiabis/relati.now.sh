import React from "react";

import "./index.scss";
import { PiecePath } from "./utils";

export type Props = {
  x: number,
  y: number,
  color: string,
  emphasis?: boolean,
};

const Focus = ({ x, y, color, emphasis = true }: Props) => (
  <path
    d={`M ${x * 5} ${y * 5} ${PiecePath.Focus}`}
    fill="none"
    stroke={color}
    strokeWidth="0.4px"
    style={{ transformOrigin: `${x * 5}px ${y * 5}px` }}
    className={emphasis ? "piece-emphasis" : undefined} />
);

export default Focus;
