import React, { useState } from "react";
import { Props } from "./types";
import Board from "../../../Board";
import { Hint, Focus } from "../../../Piece";
import RelatiPiece from "../../RelatiPiece";

const RelatiScene5 = ({ nextStep, ...props }: Props) => {
  const [focused, setFocused] = useState<JSX.Element>();
  const hints: JSX.Element[] = [];

  for (let x = 2; x < 7; x++) {
    for (let y = 2; y < 7; y++) {
      if (x !== 4 || y !== 4) {
        const key = y * 9 + x;
        hints.push(<Hint key={key} x={x} y={y} color="crimson" />);
      }
    }
  }

  const onGridClick = ({ x, y }: { x: number, y: number }) => {
    if (x === 6 && y === 6) {
      nextStep();
    }
    else {
      setFocused(<Focus x={6} y={6} color="crimson" />);
    }
  };

  const description = focused ? "點這裡如何?" : "這些就是可以點的範圍了!";

  return (
    <>
      <div className="description">{description}</div>
      <Board width={9} height={9} onGridClick={onGridClick} {...props}>
        <g>{hints}</g>
        {focused}
        <RelatiPiece x={4} y={4} symbol="O" primary />
        <RelatiPiece x={7} y={3} symbol="X" primary />
      </Board>
    </>
  );
};

export default RelatiScene5;
