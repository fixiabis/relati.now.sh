import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import { Focus } from "../../../Piece";
import { CoordinateObject } from "../../../../types";

const RelatiScene8 = ({ nextStep, game, ...props }: Props) => {
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
