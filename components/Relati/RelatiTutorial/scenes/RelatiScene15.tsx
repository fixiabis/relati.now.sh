import React from "react";
import RelatiScene14 from "./RelatiScene14";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene15: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("16"), sceneDuration);

  return (
    <>
      <div className="description">對方也開始圍起了角落!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene15.initial = (game) => {
  RelatiScene14.initial(game);

  if (game.turn === 9) {
    const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

    if (gridAtC2.piece.symbol === "X") {
      game.doPlacementByCoordinate(0, 1);
    }
    else {
      game.doPlacementByCoordinate(0, 3);
    }
  }
};

export default RelatiScene15;
