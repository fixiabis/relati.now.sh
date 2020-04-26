import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import RelatiPiece from "../../RelatiPiece";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene10 from "./RelatiScene10";

const RelatiScene11: SceneComponent = ({ toStep, game, ...props }) => {
  const [isTurnBack, setIsTurnBack] = useState(false);
  const [description, setDescription] = useState("下一步他在這就能入侵了！準備擋下來！");

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O") {
      return;
    }

    const grid = game.board.getGridAt(x, y);

    game.placeSymbolByCoordinate(x, y);

    if (!grid?.piece) {
      return;
    }

    if (x === 2 && y <= 1) {
      if (game.turn === 9) {
        return setDescription("很好，他要過來了！");
      }
      else {
        return setDescription("沒錯，你擋下來了！");
      }
    }
    else {
      if (game.turn === 9) {
        game.undo();
        return setDescription("這裡好像不行？");
      }
      else {
        return setDescription("這是特殊的戰略！");
      }
    }
  };

  const nextPlaceWarn =
    game.turn === 8
      ? <RelatiPiece x={3} y={1} symbol="X" opacity={0.4} />
      : undefined;

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      if (isTurnBack) {
        switch (game.turn) {
          case 10:
            return setIsTurnBack(false);
          case 11:
            game.undo();
            return setDescription("在試一次？");
          case 12:
            game.undo();
            return setDescription("恢復上一步");
        }
      }
      else {
        switch (game.turn) {
          case 9:
            game.placeSymbolByCoordinate(3, 1);
            return setDescription("他過來了！");
          case 11:
            if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(2, 0);
              return setDescription("並沒有，他入侵了！");
            }
            else if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(2, 1);
              return setDescription("並沒有，他入侵了！");
            }
            else {
              return toStep("12");
            }
          case 12:
            return setIsTurnBack(true);
        }
      }
    }, 1500);

    return () => clearTimeout(placementTimer);
  });

  const gameLastPlacementRecord = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x: gameLastPlacementRecord[0], y: gameLastPlacementRecord[1] };
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
        onGridClick={onGridClick}
        {...props}>
        {nextPlaceWarn}
      </RelatiBoard>
    </>
  );
};

RelatiScene11.initial = RelatiScene10.initial;

export default RelatiScene11;
