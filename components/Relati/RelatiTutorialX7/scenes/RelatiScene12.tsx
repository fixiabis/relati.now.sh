import React from "react";
import RelatiScene11 from "./RelatiScene11";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene12: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("13"), sceneDuration);

  return (
    <>
      <div className="description">對方又連了回去!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene12.initial = (game) => {
  RelatiScene11.initial(game);

  if (game.turn === 7) {
    game.doPlacementByCoordinate(6, 4);
  }
};

export default RelatiScene12;
