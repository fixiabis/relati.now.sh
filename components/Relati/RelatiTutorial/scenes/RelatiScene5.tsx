import React from "react";
import RelatiScene4 from "./RelatiScene4";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene5: SceneComponent = ({ toScene, game, ...props }) => {
  useTimeout(() => toScene("6"), 1500);

  return (
    <>
      <div className="description">輪到對方了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene5.initial = (game) => {
  RelatiScene4.initial(game);

  if (game.turn === 2) {
    game.doPlacementByCoordinate(2, 3);
  }
};

export default RelatiScene5;
