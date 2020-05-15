import React from "react";
import RelatiScene10 from "./RelatiScene10";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene11: SceneComponent = ({ toScene, game, ...props }) => {
  // useTimeout(() => toScene("9"), 1500);

  return (
    <>
      <div className="description">做的好!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene11.initial = (game) => {
  RelatiScene10.initial(game);

  if (game.turn === 4) {
    game.doPlacementByCoordinate(1, 2);
  }
};

export default RelatiScene11;
