import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";
import RelatiScene2 from "./RelatiScene2";

const RelatiScene3: SceneComponent = ({ toStep, game, ...props }) => {
  const boardLastPieceCoordinate = { x: 7, y: 3 };
  setTimeout(() => toStep("4"), 1500);

  return (
    <>
      <div className="description">輪到對方了!</div>
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
  RelatiScene2.initial(game);

  if (game.turn === 1) {
    game.placeSymbolByCoordinate(7, 3);
  }
};

export default RelatiScene3;
