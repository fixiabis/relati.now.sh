import React, { useEffect } from "react";
import RelatiScene8 from "./RelatiScene8";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";

const RelatiScene9: SceneComponent = ({ toStep: toStep, game, ...props }) => {
  useEffect(() => {
    const toNextStepAfterTimeout = setTimeout(() => toStep("10"), 1500);
    return () => clearTimeout(toNextStepAfterTimeout);
  });

  return (
    <>
      <div className="description">很好! 你的目標就是保住粉色區塊!</div>
      <RelatiBoard board={game.board} symbolOfPreviousPlayer="O" symbolOfCurrentPlayer="X" {...props}>
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene9.initial = (game) => {
  RelatiScene8.initial(game);

  if (game.turn === 6) {
    game.placeSymbolByCoordinate(2, 2);
  }
};

export default RelatiScene9;
