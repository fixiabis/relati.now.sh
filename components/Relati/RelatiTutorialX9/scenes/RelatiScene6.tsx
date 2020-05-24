import React from "react";
import RelatiScene5 from "./RelatiScene5";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene6: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("7"), sceneDuration);

  return (
    <>
      <div className="description">對方打斷了連線!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene6.initial = (game) => {
  RelatiScene5.initial(game);

  if (game.turn === 3) {
    const gridAtF2 = game.board.getGridAt(5, 1) as RelatiGrid;
    
    if (gridAtF2.piece) {
      game.doPlacementByCoordinate(4, 2);
    }
    else {
      game.doPlacementByCoordinate(4, 4);
    }
  }
};

export default RelatiScene6;
