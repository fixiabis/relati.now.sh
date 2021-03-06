import React from "react";
import RelatiScene3 from "./RelatiScene3";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene4: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 2 && (y === 1 || y === 3)) {
      game.doPlacementByCoordinate(x, y);
      toScene("5");
    }
  };

  return (
    <>
      <div className="description">選一個地方擺吧!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={2} y={1} color="crimson" emphasized />
        <Focus x={2} y={3} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene4.initial = RelatiScene3.initial;
export default RelatiScene4;
