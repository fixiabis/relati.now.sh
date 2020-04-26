import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene16C from "./RelatiScene16C";

const RelatiScene17D: SceneComponent = ({ toStep, game, ...props }) => {
  const [isTurnBack, setIsTurnBack] = useState(false);
  const [description, setDescription] = useState("他又接回去了!");

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

    if (grid.i === 27) {
      return setDescription("幹的好!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      if (isTurnBack) {
        switch (game.turn) {
          case 20:
            return setIsTurnBack(false);
          case 21:
            game.undo();
            return setDescription("再試一次?");
          case 22:
            game.undo();
            return setDescription("回到上一步中...");
        }
      }
      else {
        switch (game.turn) {
          case 21:
            if (!(game.board.getGridAt(0, 3) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(0, 3);
              return setDescription("失敗, 穩定的連線無法被打斷!");
            }
            else {
              return;
            }
          case 22:
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

RelatiScene17D.initial = (game) => {
  RelatiScene16C.initial(game);

  if (game.turn === 18) {
    game.placeSymbolByCoordinate(4, 3);
  }

  if (game.turn === 19) {
    game.placeSymbolByCoordinate(4, 2);
  }
};

export default RelatiScene17D;
