import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";
import RelatiScene12 from "./RelatiScene12";
import { CoordinateObject } from "../../../../types";
import { RelatiGrid } from "../../../../libs/Relati";

const RelatiScene13A: SceneComponent = ({ toStep, game, ...props }) => {
  const [isTurnBack, setIsTurnBack] = useState(false);
  const [description, setDescription] = useState("不錯的想法!");

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

    if (x === 0 && y === 2) {
      return setDescription("這樣也許可行?");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      if (x === 3 && y == 2) {
        return toStep("14A1");
      }

      if (x === 3 && y === 3) {
        return toStep("14A2");
      }
    }

    return setDescription("這是特殊的戰略!");
  };

  const gameLastPlacementRecord = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x: gameLastPlacementRecord[0], y: gameLastPlacementRecord[1] };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      if (isTurnBack) {
        switch (game.turn) {
          case 14:
            return setIsTurnBack(false);
          case 15:
            game.undo();
            return setDescription("在試一次?");
          case 16:
            game.undo();
            return setDescription("恢復上一步中...");
        }
      }
      else {
        switch (game.turn) {
          case 13:
            game.placeSymbolByCoordinate(0, 2);
            return setDescription("他還是入侵了!有抵抗的手段嗎?");
          case 15:
            if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
              if (!(game.board.getGridAt(1, 3) as RelatiGrid).piece) {
                game.placeSymbolByCoordinate(1, 3);
                return setDescription("失敗, 穩定的連線無法被打斷!");
              }
            }
            break;
          case 16:
            return setIsTurnBack(true);
        }
      }
    }, 1500);

    return () => clearTimeout(placementTimer);
  });

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
      </RelatiBoard>
    </>
  );
};

RelatiScene13A.initial = (game) => {
  RelatiScene12.initial(game);
  game.placeSymbolByCoordinate(1, 2);
};

export default RelatiScene13A;
