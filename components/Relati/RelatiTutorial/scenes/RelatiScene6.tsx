import React from "react";
import RelatiScene5 from "./RelatiScene5";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";

const RelatiScene6: SceneComponent = ({ toScene: toStep, game, ...props }) => {
  return (
    <>
      <div className="description">輪到對方了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene6.initial = (game) => {
  RelatiScene5.initial(game);

  if (game.turn === 3) {
    game.doPlacementByCoordinate(2, 1);
    game.doPlacementByCoordinate(2, 3);
  }
};

export default RelatiScene6;
