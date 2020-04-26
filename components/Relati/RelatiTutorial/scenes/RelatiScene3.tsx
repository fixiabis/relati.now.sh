import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";

const RelatiScene3: SceneComponent = ({ nextStep, game, ...props }) => {
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

RelatiScene3.initial = (game) => {
  game.placeSymbolByCoordinate(7, 3);
};

export default RelatiScene3;
