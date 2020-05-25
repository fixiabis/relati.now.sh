import React from "react";
import RelatiScene16 from "./RelatiScene16";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene17: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("18"), sceneDuration);

  return (
    <>
      <div className="description">做得好!你又打斷對方的連線了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene17.initial = (game) => {
  RelatiScene16.initial(game);

  if (game.turn === 10) {
    const gridAtI4 = game.board.getGridAt(8, 3) as RelatiGrid;

    if (gridAtI4.piece) {
      game.doPlacementByCoordinate(6, 5);
    }
    else {
      game.doPlacementByCoordinate(6, 3);
    }
  }
};

export default RelatiScene17;
