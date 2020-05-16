import React from "react";
import RelatiScene17 from "./RelatiScene17";
import { RelatiBoard } from "./components";
import { SceneComponent, HasPieceRelatiGrid } from "./types";
import { useTimeout } from "./hooks";

const RelatiScene18: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("19"), sceneDuration);

  return (
    <>
      <div className="description">對方圍住了一個角落!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene18.initial = (game) => {
  RelatiScene17.initial(game);

  if (game.turn === 11) {
    const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

    if (gridAtC2.piece.symbol === "X") {
      game.doPlacementByCoordinate(2, 0);
    }
    else {
      game.doPlacementByCoordinate(2, 4);
    }
  }
};

export default RelatiScene18;
