import React, { useEffect } from "react";
import RelatiScene15A from "./RelatiScene15A";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useForceUpdate } from "./utils";

const RelatiScene16A: SceneComponent = ({ toStep, game, ...props }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      const player = game.getNowPlayer();

      for (let grid of game.board.grids) {
        if (grid.piece || !game.rule.validateIsPlayerCanDoPlacement(game, grid, player)) {
          continue;
        }

        if ([0, 1, 9, 10].includes(grid.i)) {
          continue;
        }

        const { x, y } = grid;
        game.doPlacementByCoordinate(x, y);
        return forceUpdate();
      }

      if (!game.isOver) {
        for (let grid of game.board.grids) {
          if (grid.piece || !game.rule.validateIsPlayerCanDoPlacement(game, grid, player)) {
            continue;
          }

          const { x, y } = grid;
          game.doPlacementByCoordinate(x, y);
          return forceUpdate();
        }
      }

      return toStep("17A");
    }, 100);

    return () => clearTimeout(doPlacementAfterTimeout);
  });

  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };

  return (
    <>
      <div key={game.turn} className="description">加速過程中...</div>
      <RelatiBoard
        game={game}
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

RelatiScene16A.initial = (game) => {
  RelatiScene15A.initial(game);

  if (game.turn === 16) {
    game.doPlacementByCoordinate(0, 3);
  }
};

export default RelatiScene16A;
