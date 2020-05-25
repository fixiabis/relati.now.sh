import React from "react";
import RelatiScene19 from "./RelatiScene19";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene20: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("21"), sceneDuration);

  return (
    <>
      <div className="description">做得好!你大幅度打斷對方的連線了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene20.initial = (game) => {
  RelatiScene19.initial(game);

  if (game.turn === 12) {
    game.doPlacementByCoordinate(5, 2);
  }
};

export default RelatiScene20;
