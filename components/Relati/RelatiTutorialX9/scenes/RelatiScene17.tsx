import React from "react";
import RelatiScene16 from "./RelatiScene16";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene17: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("18"), sceneDuration);

  return (
    <>
      <div className="description">做的好!你開始了佈局!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene17.initial = (game) => {
  RelatiScene16.initial(game);

  if (game.turn === 10) {
    const gridAtF2 = game.board.getGridAt(5, 1) as RelatiGrid;
    
    if (gridAtF2.piece) {
      game.doPlacementByCoordinate(5, 5);
    }
    else {
      game.doPlacementByCoordinate(5, 1);
    }
  }
};

export default RelatiScene17;
