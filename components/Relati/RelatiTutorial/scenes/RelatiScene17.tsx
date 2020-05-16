import React from "react";
import RelatiScene16 from "./RelatiScene16";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene17: SceneComponent = ({ toScene, game, ...props }) => {
  // useTimeout(() => toScene("15"), 1500);

  return (
    <>
      <div className="description">做的好!你正在逼近!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene17.initial = (game) => {
  RelatiScene16.initial(game);

  if (game.turn === 10) {
    game.doPlacementByCoordinate(2, 4);
  }
};

export default RelatiScene17;
