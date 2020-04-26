import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";
import RelatiScene1 from "./RelatiScene1";

const RelatiScene2: SceneComponent = ({ toStep, game, ...props }) => {
  const boardLastPieceCoordinate = { x: 4, y: 4 };
  setTimeout(() => toStep("3"), 1000);

  return (
    <>
      <div className="description">沒錯, 你放下了根源符號, 它能幫助你提供連線!</div>
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
  RelatiScene1.initial(game);
  game.placeSymbolByCoordinate(4, 4);
};

export default RelatiScene2;
