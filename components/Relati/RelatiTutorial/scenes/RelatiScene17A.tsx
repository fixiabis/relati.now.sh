import React from "react";
import RelatiScene16A from "./RelatiScene16A";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { isGridHasAvailableRelatiRouteBySymbol } from "./utils";

const RelatiScene17A: SceneComponent = ({ toStep, game, ...props }) => {
  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O") {
      return;
    }

    const grid = game.board.getGridAt(x, y);

    if (grid?.piece) {
      return;
    }

    game.placeSymbolByCoordinate(x, y);

    if (!grid?.piece) {
      return;
    }

    toStep("END");
  };

  return (
    <>
      <div className="description">這是最後了! 讓對方無法下子就贏了!</div>
      <RelatiBoard
        board={game.board}
        onGridClick={handleGridClick}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

RelatiScene17A.initial = (game) => {
  RelatiScene16A.initial(game);

  let hasPlace = true;

  while (hasPlace) {
    const symbol = game.getNowPlayerSymbol();
    hasPlace = false;

    for (let grid of game.board.grids) {
      if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
        continue;
      }

      if ([0, 1, 9, 10].includes(grid.i)) {
        continue;
      }

      const { x, y } = grid;
      game.placeSymbolByCoordinate(x, y);
      hasPlace = true;
      break;
    }
  }

  while (game.symbolOfWinner === "?") {
    const symbol = game.getNowPlayerSymbol();

    for (let grid of game.board.grids) {
      if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
        continue;
      }

      const { x, y } = grid;
      game.placeSymbolByCoordinate(x, y);
      break;
    }
  }
};

export default RelatiScene17A;
