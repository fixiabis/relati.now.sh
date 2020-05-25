import React from "react";
import RelatiScene7 from "./RelatiScene7";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene8: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("9"), sceneDuration);

  return (
    <>
      <div className="description">做得好!你連回去了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene8.initial = (game) => {
  RelatiScene7.initial(game);

  if (game.turn === 4) {
    game.doPlacementByCoordinate(5, 3);
  }
};

export default RelatiScene8;
