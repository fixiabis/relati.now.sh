import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene11 from "./RelatiScene11";

const RelatiScene12E: SceneComponent = ({ toStep, game, ...props }) => {
  const [isTurnBack, setIsTurnBack] = useState(false);
  const [description, setDescription] = useState("他換了一個位置!");

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

    if (grid.i === 13) {
      return setDescription("沒錯, 你擋下來了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      if (isTurnBack) {
        switch (game.turn) {
          case 10:
            return setIsTurnBack(false);
          case 11:
            game.undo();
            return setDescription("再試一次?");
          case 12:
            game.undo();
            return setDescription("回到上一步中...");
        }
      }
      else {
        switch (game.turn) {
          case 11:
            if (!(game.board.getGridAt(3, 0) as Required<RelatiGrid>).piece.disabled) {
              if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
                game.placeSymbolByCoordinate(2, 0);
                return setDescription("並沒有, 他入侵了!");
              }
              else if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
                game.placeSymbolByCoordinate(2, 1);
                return setDescription("並沒有, 他入侵了!");
              }
            }
            else {
              return toStep("13C");
            }

            break;
          case 12:
            return setIsTurnBack(true);
        }
      }
    }, 1500);

    return () => clearTimeout(placementTimer);
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
        onGridClick={onGridClick}
        {...props} />
    </>
  );
};

RelatiScene12E.initial = (game) => {
  RelatiScene11.initial(game);

  if (game.turn === 8) {
    game.placeSymbolByCoordinate(3, 1);
  }

  if (game.turn === 9) {
    game.placeSymbolByCoordinate(3, 0);
  }
};

export default RelatiScene12E;
