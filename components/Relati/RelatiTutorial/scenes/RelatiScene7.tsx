import React, { useState, useEffect } from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import RelatiGame, { RelatiGrid, isGridHasAvailableRelatiRouteBySymbol } from "../../../../libs/Relati";
import { CoordinateObject } from "../../../../types";
import { Coordinate } from "gridboard";

const RelatiScene6 = ({ nextStep, board, ...props }: Props) => {
  const [description, setDescription] = useState("對方也不是省油的燈呢！");
  const [game] = useState(new RelatiGame(2));

  if (game.turn === 0) {
    game.turn = 4;
    game.board = board;

    game.placementRecords = [
      [4, 4],
      [7, 3],
      [6, 6],
      [5, 5],
    ];

    game.symbolToSourceGrid["O"] = board.getGridAt(4, 4) as RelatiGrid;
    game.symbolToSourceGrid["X"] = board.getGridAt(7, 3) as RelatiGrid;

    const gameLastPlacementRecord: Coordinate = game.board.grids.reduce((records, grid, i) => {
      if (records[0] === -1) {
        const isRecorded = game.placementRecords.some(record => record[0] === grid.x && record[1] === grid.y);
        const isGridHasPiece = grid.piece;

        if (!isRecorded && isGridHasPiece) {
          return [grid.x, grid.y];
        }
      }

      return records;
    }, [-1, -1] as Coordinate);

    if (gameLastPlacementRecord[0] === -1) {
      game.placeSymbolByCoordinate(6, 4);
    }
    else {
      game.placementRecords.push(gameLastPlacementRecord);
      game.turn++;
    }

    const shouldBlockedGrid = game.board.getGridAt(6, 6) as Required<RelatiGrid>;

    const placeableGrids = game.board.grids.filter(
      grid => !grid.piece && isGridHasAvailableRelatiRouteBySymbol(grid, "X")
    );

    for (let grid of placeableGrids) {
      const { x, y } = grid;
      game.placeSymbolByCoordinate(x, y);

      if (!shouldBlockedGrid.piece.disabled) {
        game.undo();
      }
      else {
        break;
      }
    }
  }

  const gameLastPlacementRecord = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x: gameLastPlacementRecord[0], y: gameLastPlacementRecord[1] };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  return (
    <>
      <div key={game.turn + description} className="description">{description}</div>
      <RelatiBoard
        drawLineDuration={180}
        board={game.board}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

export default RelatiScene6;
