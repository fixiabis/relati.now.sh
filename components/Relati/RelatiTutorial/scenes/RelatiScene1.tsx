import React from "react";
import { Focus } from "../../../Piece";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { SceneComponent } from "./types";

const RelatiScene1: SceneComponent = ({ toStep, game, ...props }) => {
  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 4 && y === 4) {
      toStep("2");
    }
  };

  return (
    <>
      <div className="description">看到中間的框框了嗎?你知道該怎麼做的!</div>
      <RelatiBoard board={game.board} symbolOfCurrentPlayer="O" onGridClick={onGridClick} {...props}>
        <Focus x={4} y={4} color="crimson" emphasized />
      </RelatiBoard>
    </>
  );
};

RelatiScene1.initial = (game) => {};

export default RelatiScene1;
