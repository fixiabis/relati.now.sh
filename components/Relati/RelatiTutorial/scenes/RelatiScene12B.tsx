import React, { useState, useEffect } from "react";
import RelatiScene11 from "./RelatiScene11";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene12B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他過來了!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0 || game.turn === 12) {
      return;
    }

    const grid = game.board.getGridAt(x, y);

    if (grid?.piece) {
      return;
    }

    game.doPlacementByCoordinate(x, y);

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
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 11:
          if (!(game.board.getGridAt(3, 1) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(2, 0);
              return setDescription("但是, 他靠近了!");
            }
            else if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(2, 1);
              return setDescription("但是, 他靠近了!");
            }
          }
          else if (!(game.board.getGridAt(4, 2) as RelatiGrid).piece) {
            game.doPlacementByCoordinate(4, 2);
            return setDescription("但是, 他接上了!");
          }
          else if (!(game.board.getGridAt(4, 1) as RelatiGrid).piece) {
            game.doPlacementByCoordinate(4, 1);
            return setDescription("但是, 他接上了!");
          }

          return toStep("13B");
        case 12:
          game.undo();
          game.undo();
          return setDescription("再試一次?");
      }
    }, 1500);

    return () => clearTimeout(doPlacementAfterTimeout);
  });

  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };

  return (
    <>
      <div key={description} className="description">{description}</div>
      <RelatiBoard
        game={game}
        lastPieceCoordinate={boardLastPieceCoordinate}
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
    game.doPlacementByCoordinate(4, 1);
  }

  if (game.turn === 9) {
    game.doPlacementByCoordinate(3, 1);
  }
};

export default RelatiScene12B;
