import React from "react";
import RelatiScene19 from "./RelatiScene19";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene20: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("21"), sceneDuration);

  return (
    <>
      <div className="description">做的好! 你又打斷對方的連線了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene20.initial = (game) => {
  RelatiScene19.initial(game);

  if (game.turn === 12) {
    const gridAtI4 = game.board.getGridAt(8, 3) as RelatiGrid;

    if (gridAtI4.piece) {
      game.doPlacementByCoordinate(7, 5);
    }
    else {
      game.doPlacementByCoordinate(7, 3);
    }
  }
};

export default RelatiScene20;
