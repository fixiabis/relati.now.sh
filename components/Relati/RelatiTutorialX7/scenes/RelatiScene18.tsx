import React from "react";
import RelatiScene17 from "./RelatiScene17";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene18: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("19"), sceneDuration);

  return (
    <>
      <div className="description">對方終於連回去了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene18.initial = (game) => {
  RelatiScene17.initial(game);

  if (game.turn === 11) {
    game.doPlacementByCoordinate(2, 4);
  }
};

export default RelatiScene18;
