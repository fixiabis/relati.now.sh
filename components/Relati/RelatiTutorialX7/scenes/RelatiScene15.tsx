import React from "react";
import RelatiScene14 from "./RelatiScene14";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene15: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("16"), sceneDuration);

  return (
    <>
      <div className="description">對方開始了突擊!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene15.initial = (game) => {
  RelatiScene14.initial(game);

  if (game.turn === 9) {
    game.doPlacementByCoordinate(2, 2);
  }
};

export default RelatiScene15;
