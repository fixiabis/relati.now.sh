import React from "react";
import RelatiScene5 from "./RelatiScene5";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "./hooks";

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
    
    if (gridAtC2.piece) {
      game.doPlacementByCoordinate(2, 3);
    }
    else {
      game.doPlacementByCoordinate(2, 1);
    }
  }
};

export default RelatiScene6;
