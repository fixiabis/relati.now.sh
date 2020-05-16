import React from "react";
import RelatiScene12 from "./RelatiScene12";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, HasPieceRelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene13: SceneComponent = ({ toScene, game, ...props }) => {
  const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtC2.piece.symbol === "X"
      ? [3, 1]
      : [3, 3];

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

RelatiScene13.initial = RelatiScene12.initial;
export default RelatiScene13;
