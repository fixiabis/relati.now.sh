import React from "react";
import RelatiScene7 from "./RelatiScene7";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent } from "./types";

const RelatiScene8: SceneComponent = ({ toScene, game, ...props }) => {
  return (
    <>
      <div className="description">做的好!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene8.initial = (game) => {
  RelatiScene7.initial(game);

  if (game.turn === 4) {
    game.doPlacementByCoordinate(1, 2);
  }
};

export default RelatiScene8;
