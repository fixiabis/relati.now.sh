import React, { useState, useEffect } from "react";
import RelatiScene14B from "./RelatiScene14B";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { isGridHasAvailableRelatiRouteBySymbol } from "./utils";

const RelatiScene15B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他又打斷了, 而且現在非常危險!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O" || game.turn === 18) {
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

    if (grid.i === 32 || grid.i === 39) {
      return setDescription("很好! 你接上了!");
    }

    if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你接上了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 17:
          const shouldBlockedGrid = game.board.getGridAt(2, 2) as Required<RelatiGrid>;

          if (shouldBlockedGrid.piece.disabled) {
            game.placeSymbolByCoordinate(1, 2);
            return setDescription("但是, 你來不急應對他靠近了!");
          }

          for (let grid of game.board.grids) {
            if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, "X")) {
              continue;
            }

            const { x, y } = grid;
            game.placeSymbolByCoordinate(x, y);

            if (!shouldBlockedGrid.piece.disabled) {
              game.undo();
            }
            else {
              return setDescription("但是, 他打斷了!");
            }
          }

          return toStep("16B");
        case 18:
          game.undo();
          game.undo();
          return setDescription("再試一次?");
      }
    }, 1500);

    return () => clearTimeout(doPlacementAfterTimeout);
  });

  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  return (
    <>
      <div key={description} className="description">{description}</div>
      <RelatiBoard
        board={game.board}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        onGridClick={handleGridClick}
        {...props} >
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene15B.initial = (game) => {
  RelatiScene14B.initial(game);

  if (game.turn === 14) {
    game.placeSymbolByCoordinate(2, 3);
  }

  if (game.turn === 15) {
    game.placeSymbolByCoordinate(2, 4);
  }
};

export default RelatiScene15B;
