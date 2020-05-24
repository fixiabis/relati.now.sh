import React from "react";
import RelatiScene14 from "./RelatiScene14";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene15: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("16"), sceneDuration);

  return (
    <>
      <div className="description">對方換了一個方向!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene15.initial = (game) => {
  RelatiScene14.initial(game);

  if (game.turn === 9) {
    const gridAtI4 = game.board.getGridAt(8, 3) as RelatiGrid;

    if (gridAtI4.piece) {
      game.doPlacementByCoordinate(5, 5);
    }
    else {
      game.doPlacementByCoordinate(5, 3);
    }
  }
};

export default RelatiScene15;
