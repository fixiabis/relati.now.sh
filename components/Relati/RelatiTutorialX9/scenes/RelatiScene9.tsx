import React from "react";
import RelatiScene8 from "./RelatiScene8";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene9: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("10"), sceneDuration);

  return (
    <>
      <div className="description">對方又連了回去!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene9.initial = (game) => {
  RelatiScene8.initial(game);

  if (game.turn === 5) {
    const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;
    
    if (gridAtG4.piece) {
      game.doPlacementByCoordinate(6, 2);
    }
    else {
      game.doPlacementByCoordinate(6, 6);
    }
  }
};

export default RelatiScene9;
