import React from "react";
import RelatiScene6 from "./RelatiScene6";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene7: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 1 && y === 2) {
      game.doPlacementByCoordinate(x, y);
      toScene("8");
    }
  };

  return (
    <>
      <div className="description">擺這邊!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={1} y={2} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene7.initial = RelatiScene6.initial;
export default RelatiScene7;
