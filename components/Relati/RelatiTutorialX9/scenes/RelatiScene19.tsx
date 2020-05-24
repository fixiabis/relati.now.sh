import React from "react";
import RelatiScene18 from "./RelatiScene18";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, RelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene19: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gridAtI4 = game.board.getGridAt(8, 3) as RelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtI4.piece
      ? [7, 5]
      : [7, 3];

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === exceptedX && y === exceptedY) {
      game.doPlacementByCoordinate(x, y);
      toScene("20");
    }
  };

  return (
    <>
      <div className="description">擺這邊!讓對方陷入絕望吧!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={exceptedX} y={exceptedY} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene19.initial = RelatiScene18.initial;
export default RelatiScene19;
