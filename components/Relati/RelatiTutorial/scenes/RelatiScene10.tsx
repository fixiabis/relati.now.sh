import React from "react";
import RelatiScene9 from "./RelatiScene9";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, HasPieceRelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene10: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtC2.piece.symbol === "X"
      ? [2, 4]
      : [2, 0];

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
