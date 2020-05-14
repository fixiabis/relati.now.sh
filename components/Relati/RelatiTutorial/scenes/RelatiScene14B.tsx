import React, { useState, useEffect } from "react";
import RelatiScene13B from "./RelatiScene13B";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene14B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他打斷了! 現在非常危險!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0 || game.turn === 16) {
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

    if (grid.i === 29) {
      return setDescription("很好! 他暫時無法靠近了!");
    }

    if (!(game.board.getGridAt(2, 2) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你接上了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 15:
          if (!(game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece) {
            game.doPlacementByCoordinate(1, 2);
            return setDescription("但是, 他靠近了!");
          }

          return toStep("15B");
        case 16:
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

RelatiScene14B.initial = (game) => {
  RelatiScene13B.initial(game);

  if (game.turn === 12) {
    game.doPlacementByCoordinate(3, 2);
  }

  if (game.turn === 13) {
    game.doPlacementByCoordinate(3, 3);
  }
};

export default RelatiScene14B;
