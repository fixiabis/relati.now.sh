import React from "react";
import RelatiScene16A from "./RelatiScene16A";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject } from "./types";

const RelatiScene17A: SceneComponent = ({ toStep, game, ...props }) => {
  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0) {
      return;
    }

    const grid = game.board.getGridAt(x, y);

    if (grid?.piece) {
      return;
    }

    game.doPlacementByCoordinate(x, y);

    if (!grid?.piece) {
      return;
    }

    toStep("END");
  };

  return (
    <>
      <div className="description">這是最後了! 讓對方無法下子就贏了!</div>
      <RelatiBoard
        game={game}
        onGridClick={handleGridClick}
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

RelatiScene17A.initial = (game) => {
  RelatiScene16A.initial(game);

  let hasPlace = true;

  while (hasPlace) {
    const player = game.getNowPlayer();
    hasPlace = false;

    for (let grid of game.board.grids) {
      if (grid.piece || !game.rule.validateIsPlayerCanDoPlacement(game, grid, player)) {
        continue;
      }

      if ([0, 1, 9, 10].includes(grid.i)) {
        continue;
      }

      const { x, y } = grid;
      game.doPlacementByCoordinate(x, y);
      hasPlace = true;
      break;
    }
  }

  while (!game.isOver) {
    const player = game.getNowPlayer();

    for (let grid of game.board.grids) {
      if (grid.piece || !game.rule.validateIsPlayerCanDoPlacement(game, grid, player)) {
        continue;
      }

      const { x, y } = grid;
      game.doPlacementByCoordinate(x, y);
      break;
    }
  }
};

export default RelatiScene17A;
