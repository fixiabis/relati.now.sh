import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene11 from "./RelatiScene11";

const RelatiScene12B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他過來了!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O" || game.turn === 12) {
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

    if ((game.board.getGridAt(3, 1) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    if (grid.i === 22) {
      return setDescription("很好! 他無法靠近了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 11:
          if (!(game.board.getGridAt(3, 1) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(2, 0);
              return setDescription("但是, 他靠近了!");
            }
            else if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(2, 1);
              return setDescription("但是, 他靠近了!");
            }
          }
          else if (!(game.board.getGridAt(4, 2) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(4, 2);
            return setDescription("但是, 他接上了!");
          }
          else if (!(game.board.getGridAt(4, 1) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(4, 1);
            return setDescription("但是, 他接上了!");
          }

          return toStep("13B");
        case 12:
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
        onGridClick={handleGridClick}
        {...props} >
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene12B.initial = (game) => {
  RelatiScene11.initial(game);

  if (game.turn === 8) {
    game.placeSymbolByCoordinate(4, 1);
  }

  if (game.turn === 9) {
    game.placeSymbolByCoordinate(3, 1);
  }
};

export default RelatiScene12B;
