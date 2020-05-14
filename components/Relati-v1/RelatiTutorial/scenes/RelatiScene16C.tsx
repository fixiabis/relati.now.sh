import React, { useState, useEffect } from "react";
import RelatiScene15C from "./RelatiScene15C";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene16C: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他還沒有放棄呢!");

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

    if (grid.i === 27) {
      return setDescription("很好! 他無法從這側靠近了! ");
    }

    if ((game.board.getGridAt(0, 4) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 19:
          if ((game.board.getGridAt(1, 4) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(1, 5);
            return setDescription("但是, 他接上了! ");
          }
          else if (!(game.board.getGridAt(0, 3) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(0, 3);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("17C");
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

RelatiScene16C.initial = (game) => {
  RelatiScene15C.initial(game);

  if (game.turn === 16) {
    game.placeSymbolByCoordinate(1, 3);
  }

  if (game.turn === 17) {
    game.placeSymbolByCoordinate(0, 4);
  }
};

export default RelatiScene16C;
