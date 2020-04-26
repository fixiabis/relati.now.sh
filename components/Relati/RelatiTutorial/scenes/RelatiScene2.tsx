import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";

const RelatiScene2 = ({ nextStep, game, ...props }: Props) => {
  const boardLastPieceCoordinate = { x: 4, y: 4 };
  setTimeout(nextStep, 1000);

  game.placeSymbolByCoordinate(4, 4);

  return (
    <>
      <div className="description">沒錯，你放下了根源符號，它能幫助你提供連線！</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="O"
        symbolOfCurrentPlayer="X"
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

export default RelatiScene2;
