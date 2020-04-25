import React from "react";
import { Props } from "./types";
import { Focus } from "../../../Piece";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { RelatiGrid } from "../../../../libs/Relati";

const RelatiScene1 = ({ nextStep, board, ...props }: Props) => {
  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 4 && y === 4) {
      (board.getGridAt(x, y) as RelatiGrid).piece = {
        symbol: "O",
        primary: true,
        disabled: false,
      };

      nextStep();
    }
  };

  return (
    <>
      <div className="description">看到中間的框框了嗎？你知道該怎麼做的！</div>
      <RelatiBoard board={board} symbolOfCurrentPlayer="O" onGridClick={onGridClick} {...props}>
        <Focus x={4} y={4} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

export default RelatiScene1;
