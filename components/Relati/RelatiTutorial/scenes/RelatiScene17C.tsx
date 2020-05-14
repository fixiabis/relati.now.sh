import React, { useState, useEffect } from "react";
import RelatiScene16C from "./RelatiScene16C";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene17C: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他換了方向!");

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0 || game.turn === 22) {
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

    if (grid.i === 11) {
      return setDescription("很好! 他無法從這側靠近了! ");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 21:
          if (!(game.board.getGridAt(2, 1) as RelatiGrid).piece) {
            game.doPlacementByCoordinate(2, 1);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("18C");
        case 22:
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

RelatiScene17C.initial = (game) => {
  RelatiScene16C.initial(game);

  if (game.turn === 18) {
    game.doPlacementByCoordinate(0, 3);
  }

  if (game.turn === 19) {
    game.doPlacementByCoordinate(3, 2);
  }
};

export default RelatiScene17C;
