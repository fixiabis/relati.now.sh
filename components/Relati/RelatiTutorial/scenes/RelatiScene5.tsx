import React, { useState } from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import { Focus } from "../../../Piece";
import { CoordinateObject } from "../../../../types";

const RelatiScene5 = ({ nextStep, game, ...props }: Props) => {
  const [focused, setFocused] = useState<JSX.Element>();
  const description = focused ? "點這裡如何？" : "這些就是可以點的範圍了！";

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 6 && y === 6) {
      nextStep();
    }
    else {
      setFocused(<Focus x={6} y={6} color="crimson" />);
    }
  };

  return (
    <>
      <div key={description} className="description">{description}</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        onGridClick={onGridClick}
        {...props}>
        {focused}
      </RelatiBoard>
    </>
  );
};

export default RelatiScene5;
