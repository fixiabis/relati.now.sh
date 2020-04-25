import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import { RelatiGrid } from "../../../../libs/Relati";

const RelatiScene3 = ({ nextStep, ...props }: Props) => {
  const boardLastPieceCoordinate = { x: 7, y: 3 };
  setTimeout(nextStep, 1000);

  (props.board.getGridAt(7, 3) as RelatiGrid).piece = {
    symbol: "X",
    primary: true,
    disabled: false,
  };

  return (
    <>
      <div className="description">輪到對方了！</div>
      <RelatiBoard
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

export default RelatiScene3;
