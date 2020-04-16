import React from "react";
import { Props } from "./types";
import Board from "../../../Board";
import RelatiPiece from "../../RelatiPiece";

const RelatiScene2 = ({ nextStep }: Props) => {
  setTimeout(nextStep, 1000);

  return (
    <>
      <div className="description">沒錯, 就是這樣!</div>
      <Board width={9} height={9}>
        <RelatiPiece x={4} y={4} symbol="O" primary />
      </Board>
    </>
  );
};

export default RelatiScene2;
