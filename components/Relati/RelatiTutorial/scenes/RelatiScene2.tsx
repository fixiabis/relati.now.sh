import React from "react";
import { Props } from "./types";
import Board from "../../../Board";
import RelatiPiece from "../../RelatiPiece";

const RelatiScene2 = ({ nextStep, ...props }: Props) => {
  setTimeout(nextStep, 1000);

  return (
    <>
      <div className="description">沒錯，你放下了根源符號，它能幫助你提供連線！</div>
      <Board width={9} height={9} {...props}>
        <RelatiPiece x={4} y={4} symbol="O" primary />
      </Board>
    </>
  );
};

export default RelatiScene2;
