import React from "react";
import RelatiScene13 from "./RelatiScene13";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene14: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("15"), sceneDuration);

  return (
    <>
      <div className="description">做的好!你又打斷對方的連線了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene14.initial = (game) => {
  RelatiScene13.initial(game);

  if (game.turn === 8) {
    const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;

    if (gridAtG4.piece) {
      game.doPlacementByCoordinate(8, 3);
    }
    else {
      game.doPlacementByCoordinate(8, 5);
    }
  }
};

export default RelatiScene14;
