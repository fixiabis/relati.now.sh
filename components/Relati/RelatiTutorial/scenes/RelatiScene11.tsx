import React, { useState } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "../scenes/types";
import RelatiPiece from "../../RelatiPiece";
import RelatiScene10 from "../scenes/RelatiScene10";

const RelatiScene11: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("下一步他在這就能入侵了!準備擋下來!");

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O") {
      return;
    }

    const grid = game.board.getGridAt(x, y);

    if (grid?.piece) {
      return;
    }

    game.placeSymbolByCoordinate(x, y);

    if (!grid?.piece) {
      return;
    }
    
    const exceptedGridIndexes: number[] = [2, 11, 13, 22, 12];
    const indexToNextSceneNames: string[] = ["12A", "12B", "12C", "12D", "12E"];
    const nextSceneIndex = exceptedGridIndexes.indexOf(grid.i);

    if (nextSceneIndex === -1) {
      game.undo();
      return setDescription("這裡好像不行?");
    }

    toStep(indexToNextSceneNames[nextSceneIndex]);
  };

  return (
    <>
      <div key={description} className="description">{description}</div>
      <RelatiBoard
        board={game.board}
        symbolOfCurrentPlayer="O"
        symbolOfPreviousPlayer="X"
        onGridClick={onGridClick}
        {...props}>
        <RelatiPiece x={3} y={1} symbol="X" opacity={0.6} flicker />
      </RelatiBoard>
    </>
  );
};

RelatiScene11.initial = RelatiScene10.initial;

export default RelatiScene11;
