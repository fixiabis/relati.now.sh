import React, { useEffect } from "react";
import RelatiScene6 from "./RelatiScene6";
import { RelatiBoard } from "./components";
import { SceneComponent, RelatiGrid } from "./types";

const RelatiScene7: SceneComponent = ({ toStep, game, ...props }) => {
  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };

  useEffect(() => {
    const toNextStepAfterTimeout = setTimeout(() => toStep("8"), 1500);
    return () => clearTimeout(toNextStepAfterTimeout);
  });

  return (
    <>
      <div className="description">對方也不是省油的燈呢!</div>
      <RelatiBoard
        drawLineDuration={180}
        game={game}
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

RelatiScene7.initial = (game) => {
  RelatiScene6.initial(game);

  if (game.turn === 3) {
    game.doPlacementByCoordinate(5, 5);
  }

  if (game.turn === 4) {
    game.doPlacementByCoordinate(6, 4);
  }

  if (game.turn === 5) {
    const shouldBlockedGrid = game.board.getGridAt(6, 6) as Required<RelatiGrid>;

    for (let grid of game.board.grids) {
      if (grid.piece || !game.rule.validateIsPlayerCanDoPlacement(game, grid, 1)) {
        continue;
      }

      const { x, y } = grid;
      game.doPlacementByCoordinate(x, y);

      if (!shouldBlockedGrid.piece.disabled) {
        game.undo();
      }
      else {
        break;
      }
    }
  }
};

export default RelatiScene7;
