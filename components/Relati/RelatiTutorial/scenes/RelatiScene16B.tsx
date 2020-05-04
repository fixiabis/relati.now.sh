import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene15B from "./RelatiScene15B";

const RelatiScene16B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他靠近了, 現在非常危險!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O" || game.turn === 20) {
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

    if (grid.i === 28) {
      return setDescription("很好! 你打斷了!");
    }

    if ((game.board.getGridAt(2, 4) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 19:
          if ((game.board.getGridAt(2, 4) as Required<RelatiGrid>).piece.disabled) {
            game.placeSymbolByCoordinate(6, 3);
            return setDescription("但是, 他接上了!");
          }
          else if (!(game.board.getGridAt(1, 3) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(1, 3);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("17B");
        case 20:
          game.undo();
          game.undo();
          return setDescription("再試一次?");
      }
    }, 1500);

    return () => clearTimeout(doPlacementAfterTimeout);
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

RelatiScene16B.initial = (game) => {
  RelatiScene15B.initial(game);

  if (game.turn === 16) {
    game.placeSymbolByCoordinate(3, 4);
  }

  if (game.turn === 17) {
    game.placeSymbolByCoordinate(1, 2);
  }
};

export default RelatiScene16B;
