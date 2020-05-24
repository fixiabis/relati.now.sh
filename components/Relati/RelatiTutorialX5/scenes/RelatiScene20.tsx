import React from "react";
import RelatiScene19 from "./RelatiScene19";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene20: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("21"), sceneDuration);

  return (
    <>
      <div className="description">做的好!你侵入了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene20.initial = (game) => {
  RelatiScene19.initial(game);

  if (game.turn === 12) {
    const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

    if (gridAtC2.piece.symbol === "X") {
      game.doPlacementByCoordinate(3, 4);
    }
    else {
      game.doPlacementByCoordinate(3, 0);
    }
  }
};

export default RelatiScene20;
