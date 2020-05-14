import React, { useEffect } from "react";
import RelatiScene9 from "./RelatiScene9";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";

const RelatiScene10: SceneComponent = ({ toStep: toStep, game, ...props }) => {
  useEffect(() => {
    const toNextStepAfterTimeout = setTimeout(() => toStep("11"), 1500);
    return () => clearTimeout(toNextStepAfterTimeout);
  });

  return (
    <>
      <div className="description">對方也追過來了!</div>
      <RelatiBoard
        game={game}
        {...props}>
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene10.initial = (game) => {
  RelatiScene9.initial(game);

  if (game.turn === 7) {
    game.doPlacementByCoordinate(5, 2);
  }
};

export default RelatiScene10;
