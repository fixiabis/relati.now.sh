import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";

const RelatiScene2 = ({ nextStep, ...props }: Props) => {
  const boardLastPieceCoordinate = { x: 4, y: 4 };
  setTimeout(nextStep, 1000);

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
