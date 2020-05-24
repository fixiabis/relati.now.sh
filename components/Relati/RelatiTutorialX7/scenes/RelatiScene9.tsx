import React from "react";
import RelatiScene8 from "./RelatiScene8";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene9: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("10"), sceneDuration);

  return (
    <>
      <div className="description">對方正在步步逼近!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene9.initial = (game) => {
  RelatiScene8.initial(game);

  if (game.turn === 5) {
    const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

    if (gridAtC2.piece.symbol === "X") {
      game.doPlacementByCoordinate(3, 3);
    }
    else {
      game.doPlacementByCoordinate(3, 1);
    }
  }
};

export default RelatiScene9;
