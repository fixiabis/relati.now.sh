import React, { useEffect } from "react";
import RelatiScene18B from "./RelatiScene18B";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { useForceUpdate, isGridHasAvailableRelatiRouteBySymbol } from "./utils";

const RelatiScene19B: SceneComponent = ({ toStep, game, ...props }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      const symbol = game.getNowPlayerSymbol();

      for (let grid of game.board.grids) {
        if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
          continue;
        }

        if ([0, 1, 2, 3, 9, 10, 11, 18].includes(grid.i)) {
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

      return toStep("20B");
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

RelatiScene19B.initial = (game) => {
  RelatiScene18B.initial(game);

  if (game.turn === 16) {
    game.placeSymbolByCoordinate(0, 3);
  }
};

export default RelatiScene19B;
