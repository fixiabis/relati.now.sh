import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene17C from "./RelatiScene17C";
import { CoordinateObject } from "../../../Board";

const RelatiScene18C: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他換了方向!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O" || game.turn === 24) {
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

    if (grid.i === 4 || grid.i === 2) {
      return setDescription("很好! 他永遠無法靠近了! ");
    }

    if ((game.board.getGridAt(5, 0) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 23:
          if ((game.board.getGridAt(5, 1) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(6, 1);
            return setDescription("但是, 他接上了! ");
          }
          else if (!(game.board.getGridAt(4, 0) as RelatiGrid).piece) {
            if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(2, 0);
              return setDescription("但是, 他破壞圍地了!");
            }
          }

          return toStep("19C");
        case 24:
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

RelatiScene18C.initial = (game) => {
  RelatiScene17C.initial(game);

  if (game.turn === 20) {
    game.placeSymbolByCoordinate(2, 1);
  }

  if (game.turn === 21) {
    game.placeSymbolByCoordinate(5, 0);
  }
};

export default RelatiScene18C;
