import React, { useState, useEffect } from "react";
import RelatiScene5 from "./RelatiScene5";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";

const RelatiScene6: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("中間有空格就可以放在那裡了!");
  const blockedGridAtTurn4 = game.board.getGridAt(6, 6) as Required<RelatiGrid>;

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() !== 0) {
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

    if (blockedGridAtTurn4.piece.disabled) {
      game.undo();
      return setDescription("這裡無法接上, 換個方法吧?");
    }
    else if (x === 6 && y === 4) {
      return setDescription("很好! 甚至打斷別人的連線!");
    }
    else {
      return setDescription("很好!");
    }
  };

  useEffect(() => {
    const doPlacementAfterTimeout = setTimeout(() => {
      switch (game.turn) {
        case 3:
          game.doPlacementByCoordinate(5, 5);
          return setDescription("中間沒空格, 被打斷了, 如何接上呢?");
        case 5:
          if (!blockedGridAtTurn4.piece.disabled) {
            return toStep("7");
          }
      }
    }, 1500);

    return () => clearTimeout(doPlacementAfterTimeout);
  });

  const gameLastPlacementRecord = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x: gameLastPlacementRecord[0], y: gameLastPlacementRecord[1] };

  return (
    <>
      <div key={game.turn + description} className="description">{description}</div>
      <RelatiBoard
        drawLineDuration={180}
        game={game}
        onGridClick={handleGridClick}
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

RelatiScene6.initial = (game) => {
  RelatiScene5.initial(game);

  if (game.turn === 2) {
    game.doPlacementByCoordinate(6, 6);
  }
};

export default RelatiScene6;
