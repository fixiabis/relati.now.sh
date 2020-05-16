import React from "react";
import RelatiScene16 from "./RelatiScene16";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene17: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("18"), sceneDuration);

  return (
    <>
      <div className="description">做的好!你正在逼近!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene17.initial = (game) => {
  RelatiScene16.initial(game);

  if (game.turn === 10) {
    const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

    if (gridAtC2.piece.symbol === "X") {
      game.doPlacementByCoordinate(3, 1);
    }
    else {
      game.doPlacementByCoordinate(3, 3);
    }
  }
};

export default RelatiScene17;
