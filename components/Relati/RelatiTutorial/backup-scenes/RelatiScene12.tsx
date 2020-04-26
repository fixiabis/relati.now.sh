import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "../scenes/types";
import RelatiScene11 from "./RelatiScene11";
import { CoordinateObject } from "../../../../types";
import { RelatiGrid } from "../../../../libs/Relati";

const RelatiScene12: SceneComponent = ({ toStep, game, ...props }) => {
  const [isTurnBack, setIsTurnBack] = useState(false);
  const [description, setDescription] = useState("什麼?對方從別的方向入侵了!");

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

    if (x === 1 && y === 2) {
      return toStep("13A");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      if (x === 3 && y == 2) {
        return toStep("13B");
      }

      if (x === 3 && y === 3) {
        return toStep("13C");
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
          case 12:
            return setIsTurnBack(false);
          case 13:
            game.undo();
            return setDescription("再試一次?");
          case 14:
            game.undo();
            return setDescription("恢復上一步中...");
        }
      }
      else {
        switch (game.turn) {
          case 13:
            if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
              if (!(game.board.getGridAt(1, 2) as RelatiGrid).piece) {
                game.placeSymbolByCoordinate(1, 2);
                return setDescription("並沒有, 他入侵了!");
              }
            }

            break;
          case 14:
            setIsTurnBack(true);
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
        {...props} />
    </>
  );
};

RelatiScene12.initial = (game) => {
  RelatiScene11.initial(game);
  game.placeSymbolByCoordinate(2, 1)
  game.placeSymbolByCoordinate(3, 1);
  game.placeSymbolByCoordinate(2, 0);
  game.placeSymbolByCoordinate(2, 3);
};

export default RelatiScene12;
