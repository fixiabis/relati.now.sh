import React, { useState, useEffect } from "react";
import RelatiScene14A from "./RelatiScene14A";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene15A: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他還沒有放棄呢!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0 || game.turn === 18) {
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

    if (grid.i === 27) {
      return setDescription("很好! 他永遠無法靠近了!");
    }

    if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
      return setDescription("不錯! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 17:
          if ((game.board.getGridAt(2, 3) as Required<RelatiGrid>).piece.disabled) {
            if (!(game.board.getGridAt(3, 2) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(3, 2);
              return setDescription("但是, 他還是接上了!");
            }

            if (!(game.board.getGridAt(3, 3) as RelatiGrid).piece) {
              game.doPlacementByCoordinate(3, 3);
              return setDescription("但是, 他還是接上了!");
            }
          }
          else if (!(game.board.getGridAt(0, 3) as RelatiGrid).piece) {
            game.doPlacementByCoordinate(0, 3);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("16A");
        case 18:
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

RelatiScene15A.initial = (game) => {
  RelatiScene14A.initial(game);

  if (game.turn === 14) {
    game.doPlacementByCoordinate(1, 3);
  }

  if (game.turn === 15) {
    game.doPlacementByCoordinate(1, 4);
  }
};

export default RelatiScene15A;
