import React from "react";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";

const RelatiScene1: SceneComponent = ({ toScene, game, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 2 && y === 2) {
      toScene("2");
    }
  };

  return (
    <>
      <div className="description">看到中間的框框了嗎?你知道該怎麼做的!</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props}>
        <Focus x={2} y={2} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene1.initial = (game) => { };

export default RelatiScene1;
