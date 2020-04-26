import React from "react";
import { Focus } from "../../../Piece";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";

const RelatiScene1: SceneComponent = ({ nextStep, game, ...props }) => {
  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 4 && y === 4) {
      nextStep();
    }
  };

  return (
    <>
      <div className="description">看到中間的框框了嗎？你知道該怎麼做的！</div>
      <RelatiBoard board={game.board} symbolOfCurrentPlayer="O" onGridClick={onGridClick} {...props}>
        <Focus x={4} y={4} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

export default RelatiScene1;
