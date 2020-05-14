import React, { useState, useEffect } from "react";
import RelatiScene12B from "./RelatiScene12B";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene13B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他接上了!");

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

    if (grid.i === 21) {
      return setDescription("很好! 你打斷了!");
    }

    if ((game.board.getGridAt(3, 1) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 13:
          if (!(game.board.getGridAt(3, 1) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(2, 0) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(2, 0);
              return setDescription("但是, 他靠近了!");
            }
            
            if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(2, 1);
              return setDescription("但是, 他靠近了!");
            }
          }
          else {
            if (!(game.board.getGridAt(3, 2) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(3, 2);
              return setDescription("但是, 他接上了!");
            }
          }

          return toStep("14B");
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

RelatiScene13B.initial = (game) => {
  RelatiScene12B.initial(game);

  if (game.turn === 10) {
    game.doPlacementByCoordinate(4, 2);
  }

  if (game.turn === 11) {
    game.doPlacementByCoordinate(4, 3);
  }
};

export default RelatiScene13B;
