import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Focus } from "../../../Piece";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";

const RelatiScene8: SceneComponent = ({ nextStep, game, ...props }) => {
  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 2 && y === 2) {
      nextStep();
    }
  };

  return (
    <>
      <div className="description">先忽略那邊，來圍一塊地吧！</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        onGridClick={onGridClick}
        {...props}>
        <Focus x={2} y={2} color="crimson" />
      </RelatiBoard>
    </>
  );
};

export default RelatiScene8;
