import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { RelatiGrid } from "../../../../libs/Relati";
import { CoordinateObject } from "../../../../types";
import { SceneComponent } from "./types";
import RelatiScene5 from "./RelatiScene5";

const RelatiScene6: SceneComponent = ({ toStep, game, ...props }) => {
  const [description, setDescription] = useState("中間有空格就可以放在那裡了!");
  const blockedGridAtTurn4 = game.board.getGridAt(6, 6) as Required<RelatiGrid>;

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

    if (blockedGridAtTurn4.piece.disabled) {
      game.undo();
      return setDescription("這裡無法接上, 換個方法吧?");
    }
    else if (x === 6 && y === 4) {
      return setDescription("很好! 甚至打斷別人的連線!");
    }
    else {
      return setDescription("很好!");
    }
  };

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      switch (game.turn) {
        case 3:
          game.placeSymbolByCoordinate(5, 5);
          return setDescription("中間沒空格, 被打斷了, 如何接上呢?");
        case 5:
          if (!blockedGridAtTurn4.piece.disabled) {
            return toStep("7");
          }
      }
    }, 1500);

    return () => clearTimeout(placementTimer);
  });

  const gameLastPlacementRecord = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x: gameLastPlacementRecord[0], y: gameLastPlacementRecord[1] };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  return (
    <>
      <div key={game.turn + description} className="description">{description}</div>
      <RelatiBoard
        drawLineDuration={180}
        board={game.board}
        onGridClick={onGridClick}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

RelatiScene6.initial = (game) => {
  RelatiScene5.initial(game);

  if (game.turn === 2) {
    game.placeSymbolByCoordinate(6, 6);
  }
};

export default RelatiScene6;
