import React from "react";
import RelatiScene15 from "./RelatiScene15";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene16: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gridAtF2 = game.board.getGridAt(5, 1) as RelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtF2.piece
      ? [5, 5]
      : [5, 1];

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
