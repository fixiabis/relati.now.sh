import React from "react";
import RelatiScene11 from "./RelatiScene11";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene12: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("13"), sceneDuration);

  return (
    <>
      <div className="description">對方換了方向逼近!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene12.initial = (game) => {
  RelatiScene11.initial(game);

  if (game.turn === 7) {
    const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

    if (gridAtC2.piece.symbol === "X") {
      game.doPlacementByCoordinate(1, 1);
    }
    else {
      game.doPlacementByCoordinate(1, 3);
    }
  }
};

export default RelatiScene12;
