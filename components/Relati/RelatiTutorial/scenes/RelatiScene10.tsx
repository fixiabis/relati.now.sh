import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";

const RelatiScene10: SceneComponent = ({ nextStep, game, ...props }) => {
  // setTimeout(nextStep, 1000);

  return (
    <>
      <div className="description">對方也追過來了！</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        {...props}>
      </RelatiBoard>
    </>
  );
};

RelatiScene10.initial = (game) => {
  game.placeSymbolByCoordinate(5, 2);
};

export default RelatiScene10;
