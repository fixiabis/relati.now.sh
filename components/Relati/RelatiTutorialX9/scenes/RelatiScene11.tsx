import React from "react";
import RelatiScene10 from "./RelatiScene10";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene11: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("12"), sceneDuration);

  return (
    <>
      <div className="description">做的好!你又打斷對方的連線了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene11.initial = (game) => {
  RelatiScene10.initial(game);

  if (game.turn === 6) {
    const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;

    if (gridAtG4.piece) {
      game.doPlacementByCoordinate(7, 3);
    }
    else {
      game.doPlacementByCoordinate(7, 5);
    }
  }
};

export default RelatiScene11;
