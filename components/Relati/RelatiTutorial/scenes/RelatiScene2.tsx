import React, { useEffect } from "react";
import RelatiScene1 from "./RelatiScene1";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";

const RelatiScene2: SceneComponent = ({ toStep, game, ...props }) => {
  const boardLastPieceCoordinate = { x: 4, y: 4 };

  useEffect(() => {
    const toNextStepAfterTimeout = setTimeout(() => toStep("3"), 1500);
    return () => clearTimeout(toNextStepAfterTimeout);
  });

  return (
    <>
      <div className="description">沒錯, 你放下了根源符號, 它能幫助你提供連線!</div>
      <RelatiBoard
        game={game}
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props} />
    </>
  );
};

RelatiScene2.initial = (game) => {
  RelatiScene1.initial(game);

  if (game.turn === 0) {
    game.doPlacementByCoordinate(4, 4);
  }
};

export default RelatiScene2;
