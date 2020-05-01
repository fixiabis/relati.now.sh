import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { CoordinateObject } from "../../../../types";
import { Component as SceneComponent } from "./types";
import { RelatiGrid, isGridHasAvailableRelatiRouteBySymbol } from "../../../../libs/Relati";
import RelatiScene14C from "./RelatiScene14C";

const RelatiScene15C: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("他靠近了, 現在非常危險!");

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() !== "O" || game.turn === 18) {
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

    if (grid.i === 28) {
      return setDescription("很好! 你打斷了!");
    }

    return setDescription("這是特殊的戰略!");
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 17:
          if (!(game.board.getGridAt(1, 3) as RelatiGrid).piece) {
            game.placeSymbolByCoordinate(1, 3);
            return setDescription("但是, 他破壞圍地了!");
          }

          return toStep("16C");
        case 18:
          game.undo();
          game.undo();
          return setDescription("再試一次?");
      }
    }, 1500);

    return () => clearTimeout(placementTimer);
  });

  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  return (
    <>
      <div key={description} className="description">{description}</div>
      <RelatiBoard
        board={game.board}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        onGridClick={onGridClick}
        {...props} >
        <rect x="0" y="0" width="10" height="10" fill="crimson" opacity="0.4" />
      </RelatiBoard>
    </>
  );
};

RelatiScene15C.initial = (game) => {
  RelatiScene14C.initial(game);

  if (game.turn === 14) {
    game.placeSymbolByCoordinate(3, 4);
  }

  if (game.turn === 15) {
    game.placeSymbolByCoordinate(1, 2);
  }
};

export default RelatiScene15C;
