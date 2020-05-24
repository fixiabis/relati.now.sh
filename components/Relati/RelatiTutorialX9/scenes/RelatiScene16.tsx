import React from "react";
import RelatiScene15 from "./RelatiScene15";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene16: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gridAtI4 = game.board.getGridAt(8, 3) as RelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtI4.piece
      ? [6, 5]
      : [6, 3];

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === exceptedX && y === exceptedY) {
      game.doPlacementByCoordinate(x, y);
      toScene("17");
    }
  };

  return (
    <>
      <div className="description">擺這邊!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={exceptedX} y={exceptedY} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene16.initial = RelatiScene15.initial;
export default RelatiScene16;
