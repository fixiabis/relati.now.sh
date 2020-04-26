import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import { RelatiGrid } from "../../../../libs/Relati";
import RelatiScene12A from "./RelatiScene12A";

const RelatiScene13A: SceneComponent = ({ toStep, game, ...props }) => {
  const [isTurnBack, setIsTurnBack] = useState(false);
  const [description, setDescription] = useState("他換了一個方向!");

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

    if (grid.i === 19) {
      return setDescription("這是個不錯的辦法!");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("你擋下來了!");
    }

    return setDescription("這是特殊的戰略!");
  };

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
            return setDescription("回到上一步中...");
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
              else {
                return toStep("14A");
              }
            }
            else if ((game.board.getGridAt(3, 3) as RelatiGrid).piece) {
              return toStep("14B");
            }
            else {
              return toStep("14C");
            }
          case 14:
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

RelatiScene13A.initial = (game) => {
  RelatiScene12A.initial(game);

  if (game.turn === 9) {
    game.placeSymbolByCoordinate(3, 1);
  }

  if (game.turn === 10) {
    game.placeSymbolByCoordinate(2, 1);
  }

  if (game.turn === 11) {
    game.placeSymbolByCoordinate(2, 3);
  }
};

export default RelatiScene13A;
