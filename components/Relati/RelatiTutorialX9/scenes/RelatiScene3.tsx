import React from "react";
import RelatiScene2 from "./RelatiScene2";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene3: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("4"), sceneDuration);

  return (
    <>
      <div className="description">輪到對方了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene3.initial = (game) => {
  RelatiScene2.initial(game);

  if (game.turn === 1) {
    game.doPlacementByCoordinate(7, 4);
  }
};

export default RelatiScene3;
