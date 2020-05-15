import React from "react";
import RelatiScene5 from "./RelatiScene5";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "./hooks";
import { Coordinate } from "gridboard";

const RelatiScene6: SceneComponent = ({ toScene, game, ...props }) => {
  useTimeout(() => toScene("7"), 1500);

  return (
    <>
      <div className="description">對方從另一個角度切入!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene6.initial = (game) => {
  RelatiScene5.initial(game);

  if (game.turn === 3) {
    const gridAtC2 = game.board.getGridAt(2, 1) as RelatiGrid;
    const gridAtC4 = game.board.getGridAt(2, 3) as RelatiGrid;
    
    if (gridAtC2.piece) {
      game.doPlacementByCoordinate(gridAtC4.x, gridAtC4.y);
    }
    else {
      game.doPlacementByCoordinate(gridAtC2.x, gridAtC2.y);
    }
  }
};

export default RelatiScene6;
