import React, { useState, useEffect } from "react";
import RelatiScene17B from "./RelatiScene17B";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene18B: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他換了方向!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0 || game.turn === 24) {
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

    if (grid.i === 4) {
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
            game.doPlacementByCoordinate(6, 1);
            return setDescription("但是, 他接上了! ");
          }
          else if (!(game.board.getGridAt(4, 0) as RelatiGrid).piece) {
            game.doPlacementByCoordinate(4, 0);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("19B");
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

RelatiScene18B.initial = (game) => {
  RelatiScene17B.initial(game);

  if (game.turn === 20) {
    game.doPlacementByCoordinate(0, 3);
  }

  if (game.turn === 21) {
    game.doPlacementByCoordinate(5, 0);
  }
};

export default RelatiScene18B;
