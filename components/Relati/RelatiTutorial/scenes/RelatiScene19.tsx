import React from "react";
import RelatiScene18 from "./RelatiScene18";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject, HasPieceRelatiGrid } from "./types";
import { preventEffect } from "./utilities";

const RelatiScene19: SceneComponent = ({ toScene, game, ...props }) => {
  const gridAtC2 = game.board.getGridAt(2, 1) as HasPieceRelatiGrid;

  const [exceptedX, exceptedY] =
    gridAtC2.piece.symbol === "X"
      ? [3, 4]
      : [3, 0];

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === exceptedX && y === exceptedY) {
      game.doPlacementByCoordinate(x, y);
      toScene("20");
    }
  };

  return (
    <>
      <div className="description">擺這邊!不能讓對方再得逞!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} {...preventEffect}>
        <Focus x={exceptedX} y={exceptedY} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene19.initial = RelatiScene18.initial;
export default RelatiScene19;
