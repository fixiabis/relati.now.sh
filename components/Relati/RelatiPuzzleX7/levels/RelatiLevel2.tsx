import React, { useState, useEffect } from "react";
import { RelatiBoard } from "./components";
import { LevelComponent, CoordinateObject } from "./types";
import { useForceUpdate, useTimeout } from "../../../hooks";
import { HasPieceRelatiGrid } from "../../../../libraries";

const RelatiLevel2: LevelComponent = ({ toLevel, onFailed: handleFailed, game, ...props }) => {
  const [description, setDescription] = useState("讓對方功虧一簣!");
  const forceUpdate = useForceUpdate();

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, 1);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (x === 5 && y === 4) {
      setDescription("做得好! 讓對方沒有任何佔領區域!");
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 31) {
      setDescription("讓對方功虧一簣!");
    }
  });

  useTimeout(() => {
    if (game.turn < 32) {
      return;
    }

    const grid = game.board.getGridAt(5, 4) as HasPieceRelatiGrid;

    if (!grid.piece) {
      game.doPlacementByCoordinateAndPlayer(5, 4, 0);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
      setDescription("失敗了! 對方佔領了比我方大的區域!");
      handleFailed("失敗了! 對方佔領了比我方大的區域!");
    }
    else if (grid.piece.symbol === "X") {
      toLevel("END");
    }
  }, 1800);

  return (
    <>
      <div className="description" key={description}>{description}</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} drawLineDuration={0} />
    </>
  );
};

RelatiLevel2.initial = (game) => {
  const turn = 31;
  const pieceCodes = "0003430000334003334423344333444440400543310004000";
  game.restart();
  game.restoreByTurnAndPieceCodes(turn, pieceCodes);
};

export default RelatiLevel2;
