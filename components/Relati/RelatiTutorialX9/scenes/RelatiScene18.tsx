import React from "react";
import RelatiScene17 from "./RelatiScene17";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene18: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("19"), sceneDuration);

  return (
    <>
      <div className="description">對方又連回去了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene18.initial = (game) => {
  RelatiScene17.initial(game);

  if (game.turn === 11) {
    const gridAtI4 = game.board.getGridAt(8, 3) as RelatiGrid;

    if (gridAtI4.piece) {
      game.doPlacementByCoordinate(6, 6);
    }
    else {
      game.doPlacementByCoordinate(6, 2);
    }
  }
};

export default RelatiScene18;
