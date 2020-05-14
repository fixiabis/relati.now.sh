import React, { useState, useEffect } from "react";
import RelatiScene11 from "./RelatiScene11";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene12C: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他換了位置!");

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

    if (grid.i === 13) {
      return setDescription("很好! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 11:
          if (!(game.board.getGridAt(3, 0) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(2, 0);
              return setDescription("但是, 他靠近了!");
            }
            else if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(2, 1);
              return setDescription("但是, 他靠近了!");
            }
          }

          return toStep("13C");
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

RelatiScene12C.initial = (game) => {
  RelatiScene11.initial(game);

  if (game.turn === 8) {
    game.doPlacementByCoordinate(3, 1);
  }

  if (game.turn === 9) {
    game.doPlacementByCoordinate(3, 0);
  }
};

export default RelatiScene12C;
