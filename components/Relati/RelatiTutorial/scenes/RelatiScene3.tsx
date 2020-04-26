import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";

const RelatiScene3 = ({ nextStep, game, ...props }: Props) => {
  const boardLastPieceCoordinate = { x: 7, y: 3 };
  setTimeout(nextStep, 1000);

  return (
    <>
      <div className="description">輪到對方了！</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

export default RelatiScene3;
