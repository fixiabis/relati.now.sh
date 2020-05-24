import React from "react";
import RelatiScene11 from "./RelatiScene11";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
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
    const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;

    if (gridAtG4.piece) {
      game.doPlacementByCoordinate(8, 2);
    }
    else {
      game.doPlacementByCoordinate(8, 6);
    }
  }
};

export default RelatiScene12;
