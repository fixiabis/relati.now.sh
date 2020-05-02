import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { SceneComponent } from "./types";
import { isGridHasAvailableRelatiRouteBySymbol } from "../../../../libs/Relati";
import RelatiScene19C from "./RelatiScene19C";
import { CoordinateObject } from "../../../../types";

const RelatiScene20C: SceneComponent = ({ toStep, game, ...props }) => {

  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: CoordinateObject) => {
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
        onGridClick={onGridClick}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

RelatiScene20C.initial = (game) => {
  RelatiScene19C.initial(game);

  let hasPlace = true;

  while (hasPlace) {
    const symbol = game.getNowPlayerSymbol();
    hasPlace = false;

    for (let grid of game.board.grids) {
      if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
        continue;
      }

      if ([0, 1, 2, 9, 10, 18].includes(grid.i)) {
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

export default RelatiScene20C;