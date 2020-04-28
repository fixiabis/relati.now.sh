import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene14A from "./RelatiScene14A";

const RelatiScene15A: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他還沒有放棄呢!");

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
      return setDescription("很好! 他永遠無法靠近了!");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 17:
          if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(3, 2) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(3, 2);
              return setDescription("但是, 他還是接上了!");
            }

            if (!(game.board.getGridAt(3, 3) as RelatiGrid).piece) {
              game.placeSymbolByCoordinate(3, 3);
              return setDescription("但是, 他還是接上了!");
            }
          }
          else if (!(game.board.getGridAt(0, 3) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(0, 3);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("16A");
        case 18:
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

RelatiScene15A.initial = (game) => {
  RelatiScene14A.initial(game);

  if (game.turn === 14) {
    game.placeSymbolByCoordinate(1, 3);
  }

  if (game.turn === 15) {
    game.placeSymbolByCoordinate(1, 4);
  }
};

export default RelatiScene15A;
