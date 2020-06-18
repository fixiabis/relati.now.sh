import React, { useState, useEffect } from "react";
import { RelatiBoard } from "./components";
import { LevelComponent, CoordinateObject } from "./types";
import { useForceUpdate, useTimeout } from "../../../hooks";
import { HasPieceRelatiGrid } from "../../../../libraries";

const RelatiLevel3: LevelComponent = ({ toLevel, onFailed: handleFailed, game, ...props }) => {
  const [description, setDescription] = useState("佔領比對方大的區域!");
  const forceUpdate = useForceUpdate();

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, 1);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (x === 4 && y === 3) {
      setDescription("做得好! 佔領了比對方大的區域!");
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 19) {
      setDescription("佔領比對方大的區域!");
    }
  });

  useTimeout(() => {
    if (game.turn < 20) {
      return;
    }

    const grid = game.board.getGridAt(4, 3) as HasPieceRelatiGrid;

    if (!grid.piece) {
      game.doPlacementByCoordinateAndPlayer(4, 3, 0);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
      setDescription("失敗了! 對方侵入了你的區域!");
      handleFailed("失敗了! 對方侵入了你的區域!");
    }
    else if (grid.piece.symbol === "X") {
      toLevel("4");
    }
  }, 1000);

  return (
    <>
      <div className="description" key={description}>{description}</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} drawLineDuration={0} />
    </>
  );
};

RelatiLevel3.initial = (game) => {
  const turn = 19;
  const pieceCodes = "0443004333441233344003340";
  game.restart();
  game.restoreByTurnAndPieceCodes(turn, pieceCodes);
};

export default RelatiLevel3;
