import React from "react";
import RelatiScene5 from "./RelatiScene5";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene6: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("7"), sceneDuration);

  return (
    <>
      <div className="description">對方開始了佈局!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene6.initial = (game) => {
  RelatiScene5.initial(game);

  if (game.turn === 3) {
    const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;
    
    if (gridAtG4.piece) {
      game.doPlacementByCoordinate(5, 3);
    }
    else {
      game.doPlacementByCoordinate(5, 5);
    }
  }
};

export default RelatiScene6;
