import React from "react";
import RelatiBoard from "../../RelatiBoard";
import { Component as SceneComponent } from "./types";
import RelatiScene11 from "./RelatiScene11";

const RelatiScene12: SceneComponent = ({ toStep, game, ...props }) => {
  const boardLastPieceCoordinate = { x: 2, y: 3 };

  return (
    <>
      <div className="description">什麼？對方從別的方向入侵了！</div>
      <RelatiBoard
        board={game.board}
        symbolOfPreviousPlayer="X"
        symbolOfCurrentPlayer="O"
        lastPieceCoordinate={boardLastPieceCoordinate}
        {...props}>
      </RelatiBoard>
    </>
  );
};

RelatiScene12.initial = (game) => {
  RelatiScene11.initial(game);
  game.placeSymbolByCoordinate(2, 1)
  game.placeSymbolByCoordinate(3, 1);
  game.placeSymbolByCoordinate(2, 0);
  game.placeSymbolByCoordinate(2, 3);
};

export default RelatiScene12;
