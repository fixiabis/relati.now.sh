import React from "react";
import RelatiScene7 from "./RelatiScene7";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";

const RelatiScene8: SceneComponent = ({ toStep, game, ...props }) => {
  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 2 && y === 2) {
      toStep("9");
    }
  };

  return (
    <>
      <div className="description">先忽略那邊, 來圍一塊地吧!</div>
      <RelatiBoard
        game={game}
        onGridClick={handleGridClick}
        {...props}>
        <Focus x={2} y={2} color="crimson" />
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene8.initial = RelatiScene7.initial;

export default RelatiScene8;
