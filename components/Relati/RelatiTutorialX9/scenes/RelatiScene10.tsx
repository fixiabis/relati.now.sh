import React from "react";
import RelatiScene9 from "./RelatiScene9";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene10: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtG4.piece
      ? [7, 3]
      : [7, 5];

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === exceptedX && y === exceptedY) {
      game.doPlacementByCoordinate(x, y);
      toScene("11");
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

RelatiScene10.initial = RelatiScene9.initial;
export default RelatiScene10;
