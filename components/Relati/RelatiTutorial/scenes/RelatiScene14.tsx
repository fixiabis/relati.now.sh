import React from "react";
import RelatiScene13 from "./RelatiScene13";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene14: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("15"), sceneDuration);

  return (
    <>
      <div className="description">做的好!你現在圍住了一個角落!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene14.initial = (game) => {
  RelatiScene13.initial(game);

  if (game.turn === 8) {
    game.doPlacementByCoordinate(0, 2);
  }
};

export default RelatiScene14;
