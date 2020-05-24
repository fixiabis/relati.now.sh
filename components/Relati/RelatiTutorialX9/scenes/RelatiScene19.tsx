import React from "react";
import RelatiScene18 from "./RelatiScene18";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene19: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 5 && y === 2) {
      game.doPlacementByCoordinate(x, y);
      toScene("20");
    }
  };

  return (
    <>
      <div className="description">擺這邊!讓對方陷入絕望吧!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={5} y={2} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene19.initial = RelatiScene18.initial;
export default RelatiScene19;
