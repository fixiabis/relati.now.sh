import React from "react";
import RelatiScene12 from "./RelatiScene12";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene13: SceneComponent = ({ toScene, game, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 0 && y === 2) {
      game.doPlacementByCoordinate(x, y);
      toScene("14");
    }
  };

  return (
    <>
      <div className="description">擺這邊!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={0} y={2} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene13.initial = RelatiScene12.initial;
export default RelatiScene13;
