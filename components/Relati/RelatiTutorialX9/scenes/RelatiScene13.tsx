import React from "react";
import RelatiScene12 from "./RelatiScene12";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene13: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gridAtG4 = game.board.getGridAt(6, 3) as RelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtG4.piece
      ? [8, 3]
      : [8, 5];

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === exceptedX && y === exceptedY) {
      game.doPlacementByCoordinate(x, y);
      toScene("14");
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

RelatiScene13.initial = RelatiScene12.initial;
export default RelatiScene13;
