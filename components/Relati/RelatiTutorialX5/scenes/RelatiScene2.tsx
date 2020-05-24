import React from "react";
import RelatiScene1 from "./RelatiScene1";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene2: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("3"), sceneDuration);

  return (
    <>
      <div className="description">沒錯, 你放下了根源符號, 它能幫助你提供連線!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene2.initial = (game) => {
  RelatiScene1.initial(game);

  if (game.turn === 0) {
    game.doPlacementByCoordinate(2, 2);
  }
};

export default RelatiScene2;
