import React from "react";
import RelatiScene8 from "./RelatiScene8";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene9: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("10"), sceneDuration);

  return (
    <>
      <div className="description">對方正在蠢蠢欲動!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene9.initial = (game) => {
  RelatiScene8.initial(game);

  if (game.turn === 5) {
    const gridAtF2 = game.board.getGridAt(5, 1) as RelatiGrid;
    
    if (gridAtF2.piece) {
      game.doPlacementByCoordinate(4, 4);
    }
    else {
      game.doPlacementByCoordinate(4, 2);
    }
  }
};

export default RelatiScene9;
