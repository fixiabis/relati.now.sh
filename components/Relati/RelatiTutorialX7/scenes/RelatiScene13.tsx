import React from "react";
import RelatiScene12 from "./RelatiScene12";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene13: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 6 && y === 3) {
      game.doPlacementByCoordinate(x, y);
      toScene("14");
    }
  };

  return (
    <>
      <div className="description">擺這邊!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={6} y={3} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene13.initial = RelatiScene12.initial;
export default RelatiScene13;
