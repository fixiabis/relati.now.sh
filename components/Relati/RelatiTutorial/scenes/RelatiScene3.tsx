import React, { useState } from "react";
import { Props } from "./types";
import Board from "../../../Board";
import RelatiPiece from "../../RelatiPiece";

const RelatiScene3 = ({ nextStep }: Props) => {
  setTimeout(nextStep, 1000);

  return (
    <>
      <div className="description">輪到對方了!</div>
      <Board width={9} height={9}>
        <RelatiPiece x={4} y={4} symbol="O" primary />
        <RelatiPiece x={7} y={4} symbol="X" primary />
      </Board>
    </>
  );
};

export default RelatiScene3;
