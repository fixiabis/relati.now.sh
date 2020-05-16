import React from "react";
import RelatiScene21 from "./RelatiScene21";
import { RelatiBoard } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene22: SceneComponent = ({ toScene, game, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);
    game.doPlacementByCoordinate(x, y);

    if (grid?.piece) {
      toScene("23");
    }
  };

  if (game.isOver) {
    toScene("24");
  }

  return (
    <>
      <div className="description">輪到你了!請自由發揮!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect} />
    </>
  );
};

RelatiScene22.initial = RelatiScene21.initial;
export default RelatiScene22;
