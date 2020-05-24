import React from "react";
import RelatiScene9 from "./RelatiScene9";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene10: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 4 && y === 3) {
      game.doPlacementByCoordinate(x, y);
      toScene("11");
    }
  };

  return (
    <>
      <div className="description">擺這邊!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={4} y={3} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene10.initial = RelatiScene9.initial;
export default RelatiScene10;
