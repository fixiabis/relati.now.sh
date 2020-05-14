import React, { useState } from "react";
import RelatiScene4 from "./RelatiScene4";
import { RelatiBoard, Focus } from "./components";
import { SceneComponent, CoordinateObject } from "./types";

const RelatiScene5: SceneComponent = ({ toStep, game, ...props }) => {
  const [focused, setFocused] = useState<JSX.Element>();
  const description = focused ? "點這裡如何?" : "這些就是可以點的範圍了!";

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (x === 6 && y === 6) {
      toStep("6");
    }
    else {
      setFocused(<Focus x={6} y={6} color="crimson" />);
    }
  };

  return (
    <>
      <div key={description} className="description">{description}</div>
      <RelatiBoard
        game={game}
        onGridClick={handleGridClick}
        {...props}>
        {focused}
      </RelatiBoard>
    </>
  );
};

RelatiScene5.initial = RelatiScene4.initial;

export default RelatiScene5;
