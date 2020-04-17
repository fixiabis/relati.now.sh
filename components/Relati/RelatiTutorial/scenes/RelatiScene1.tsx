import React from "react";
import { Props } from "./types";
import Board from "../../../Board";
import { Focus } from "../../../Piece";
import { CoordinateObject } from "../../../../types";

const RelatiScene1 = ({ nextStep, ...props }: Props) => {
  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 4 && y === 4) {
      nextStep();
    }
  };

  return (
    <>
      <div className="description">看到中間的框框了嗎?你知道該怎麼做的!</div>
      <Board width={9} height={9} onGridClick={onGridClick} {...props}>
        <Focus x={4} y={4} color="crimson" emphasized />
      </Board>
    </>
  );
};

export default RelatiScene1;
