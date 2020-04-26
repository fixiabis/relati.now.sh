import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";
import RelatiScene8 from "./RelatiScene8";

const RelatiScene9: SceneComponent = ({ toStep: toStep, game, ...props }) => {
  setTimeout(() => toStep("10"), 1000);

  return (
    <>
      <div className="description">很好，就是這樣！</div>
      <RelatiBoard board={game.board} symbolOfPreviousPlayer="O" symbolOfCurrentPlayer="X" {...props} />
    </>
  );
};

RelatiScene9.initial = (game) => {
  RelatiScene8.initial(game);
  game.placeSymbolByCoordinate(2, 2);
};

export default RelatiScene9;
