import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "../scenes/types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene12A from "./RelatiScene12A";

const RelatiScene13A: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他換了方向!");

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O" || game.turn === 14) {
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

    if (grid.i === 19) {
      return setDescription("很好! 圍地差一個就完成了!");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 13:
          if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(1, 2) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(1, 2);
              return setDescription("但是, 他靠近了!");
            }
          }
          else {
            if (!(game.board.getGridAt(3, 2) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(3, 2);
              return setDescription("但是, 他接上了!");
            }

            if (!(game.board.getGridAt(3, 3) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(3, 3);
              return setDescription("但是, 他接上了!");
            }
          }

          return toStep("14A");
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
        {...props} >
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene13A.initial = (game) => {
  RelatiScene12A.initial(game);

  if (game.turn === 10) {
    game.placeSymbolByCoordinate(2, 1);
  }

  if (game.turn === 11) {
    game.placeSymbolByCoordinate(2, 3);
  }
};

export default RelatiScene13A;
