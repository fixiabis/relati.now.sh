import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "../scenes/types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene12C from "./RelatiScene12C";

const RelatiScene13C: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他打斷了! 現在非常危險!");

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

    if (grid.i === 29) {
      return setDescription("很好! 他暫時無法靠近了!");
    }

    if (!(game.board.getGridAt(2, 2) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你接上了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 13:
          if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece) {
            game.placeSymbolByCoordinate(1, 2);
            return setDescription("但是, 他靠近了!");
          }

          return toStep("14C");
        case 14:
          game.undo();
          game.undo();
          return setDescription("再試一次?");
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

RelatiScene13C.initial = (game) => {
  RelatiScene12C.initial(game);

  if (game.turn === 10) {
    game.placeSymbolByCoordinate(4, 1);
  }

  if (game.turn === 11) {
    game.placeSymbolByCoordinate(3, 3);
  }
};

export default RelatiScene13C;
