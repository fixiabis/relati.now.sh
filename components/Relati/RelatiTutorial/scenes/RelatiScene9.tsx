import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";

const RelatiScene9: SceneComponent = ({ nextStep, game, ...props }) => {
  setTimeout(nextStep, 1000);

  return (
    <>
      <div className="description">很好，就是這樣！</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        {...props}>
      </RelatiBoard>
    </>
  );
};

RelatiScene9.initial = (game) => {
  game.placeSymbolByCoordinate(2, 2);
};

export default RelatiScene9;
