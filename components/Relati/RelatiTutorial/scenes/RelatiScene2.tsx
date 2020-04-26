import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";

const RelatiScene2: SceneComponent = ({ nextStep, game, ...props }) => {
  const boardLastPieceCoordinate = { x: 4, y: 4 };
  setTimeout(nextStep, 1000);

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

RelatiScene2.initial = (game) => {
  game.placeSymbolByCoordinate(4, 4);
};

export default RelatiScene2;
