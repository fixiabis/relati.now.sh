import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Focus } from "../../../Piece";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import RelatiScene7 from "./RelatiScene7";

const RelatiScene8: SceneComponent = ({ toStep, game, ...props }) => {
  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 2 && y === 2) {
      toStep("9");
    }
  };

  return (
    <>
      <div className="description">先忽略那邊, 來圍一塊地吧!</div>
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

RelatiScene8.initial = RelatiScene7.initial;

export default RelatiScene8;
