import React, { useEffect } from "react";
import RelatiScene15A from "./RelatiScene15A";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useForceUpdate, isGridHasAvailableRelatiRouteBySymbol } from "./utils";

const RelatiScene16A: SceneComponent = ({ toStep, game, ...props }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      const symbol = game.getNowPlayerSymbol();

      for (let grid of game.board.grids) {
        if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
          continue;
        }

        if ([0, 1, 9, 10].includes(grid.i)) {
          continue;
        }

        const { x, y } = grid;
        game.placeSymbolByCoordinate(x, y);
        return forceUpdate();
      }

      if (game.symbolOfWinner === "?") {
        for (let grid of game.board.grids) {
          if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
            continue;
          }

          const { x, y } = grid;
          game.placeSymbolByCoordinate(x, y);
          return forceUpdate();
        }
      }

      return toStep("17A");
    }, 100);

    return () => clearTimeout(doPlacementAfterTimeout);
  });

  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  return (
    <>
      <div key={game.turn} className="description">加速過程中...</div>
      <RelatiBoard
        board={game.board}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

RelatiScene16A.initial = (game) => {
  RelatiScene15A.initial(game);

  if (game.turn === 16) {
    game.placeSymbolByCoordinate(0, 3);
  }
};

export default RelatiScene16A;
