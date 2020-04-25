import React, { useState, useEffect } from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import RelatiGame, { RelatiGrid } from "../../../../libs/Relati";
import { CoordinateObject } from "../../../../types";

const RelatiScene6 = ({ nextStep, board, ...props }: Props) => {
  const [description, setDescription] = useState("中間有空格就可以放在那裡了！");
  const [game] = useState(new RelatiGame(2));
  const blockedGridAtTurn4 = game.board.getGridAt(6, 6) as Required<RelatiGrid>;

  const onGridClick = ({ x, y }: CoordinateObject) => {
    game.placeSymbolByCoordinate(x, y);

    if (blockedGridAtTurn4.piece.disabled) {
      game.undo();
      return setDescription("這裡好像不行？");
    }
    else if (x === 6 && y === 4) {
      return setDescription("成功了，厲害！甚至切斷別人的連線！");
    }
    else {
      return setDescription("成功了，恭喜你！");
    }
  };

  if (game.turn === 0) {
    game.turn = 3;
    game.board = board;

    game.placementRecords = [
      [4, 4],
      [7, 3],
      [6, 6],
    ];

    game.symbolToSourceGrid["O"] = board.getGridAt(4, 4) as RelatiGrid;
    game.symbolToSourceGrid["X"] = board.getGridAt(7, 3) as RelatiGrid;
  }

  const gameLastPlacementRecord = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x: gameLastPlacementRecord[0], y: gameLastPlacementRecord[1] };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 3:
          game.placeSymbolByCoordinate(5, 5);
          return setDescription("中間沒空格，被打斷了，如何接回去呢？");
        case 5:
          if (!blockedGridAtTurn4.piece.disabled) {
            return nextStep();
          }
      }
    }, 1500);

    return () => clearTimeout(placementTimer);
  });

  return (
    <>
      <div key={game.turn + description} className="description">{description}</div>
      <RelatiBoard
        drawLineDuration={180}
        board={game.board}
        onGridClick={onGridClick}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

export default RelatiScene6;
