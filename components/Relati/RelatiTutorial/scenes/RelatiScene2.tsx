import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import { RelatiGrid } from "../../../../libs/Relati";

const RelatiScene2 = ({ nextStep, ...props }: Props) => {
  const boardLastPieceCoordinate = { x: 4, y: 4 };
  setTimeout(nextStep, 1000);
  
  (props.board.getGridAt(4, 4) as RelatiGrid).piece = {
    symbol: "O",
    primary: true,
    disabled: false,
  };

  return (
    <>
      <div className="description">沒錯，你放下了根源符號，它能幫助你提供連線！</div>
      <RelatiBoard
        symbolOfPreviousPlayer="O"
        symbolOfCurrentPlayer="X"
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

export default RelatiScene2;
