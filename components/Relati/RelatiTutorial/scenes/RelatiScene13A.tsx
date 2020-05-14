import React, { useState, useEffect } from "react";
import RelatiScene12A from "./RelatiScene12A";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene13A: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他換了方向!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0 || game.turn === 14) {
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

    if (grid.i === 19) {
      return setDescription("很好! 圍地差一個就完成了!");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 13:
          if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(1, 2) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(1, 2);
              return setDescription("但是, 他靠近了!");
            }
          }
          else {
            if (!(game.board.getGridAt(3, 2) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(3, 2);
              return setDescription("但是, 他接上了!");
            }

            if (!(game.board.getGridAt(3, 3) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(3, 3);
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

RelatiScene13A.initial = (game) => {
  RelatiScene12A.initial(game);

  if (game.turn === 10) {
    game.doPlacementByCoordinate(2, 1);
  }

  if (game.turn === 11) {
    game.doPlacementByCoordinate(2, 3);
  }
};

export default RelatiScene13A;
