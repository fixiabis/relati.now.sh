import React, { useState, useEffect } from "react";
import { RelatiBoard } from "./components";
import { LevelComponent, CoordinateObject } from "./types";
import { useForceUpdate, useTimeout } from "../../../hooks";
import { HasPieceRelatiGrid } from "../../../../libraries";

const RelatiLevel1: LevelComponent = ({ toLevel, onFailed: handleFailed, game, ...props }) => {
  const [description, setDescription] = useState("讓不要讓自己功虧一簣!");
  const forceUpdate = useForceUpdate();

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, 1);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (x === 1 && y === 4) {
      setDescription("做得好! 成功挽救了區域!");
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 29) {
      setDescription("讓不要讓自己功虧一簣!");
    }
  });

  useTimeout(() => {
    if (game.turn < 30) {
      return;
    }

    const grid = game.board.getGridAt(1, 4) as HasPieceRelatiGrid;

    if (!grid.piece) {
      game.doPlacementByCoordinateAndPlayer(1, 4, 0);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
      setDescription("失敗了! 自己沒有占領區域了!");
      handleFailed("失敗了! 自己沒有占領區域了!");
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

RelatiLevel1.initial = (game) => {
  const turn = 29;
  const pieceCodes = "000000000000000000040030000002343000300044300433003440443303410044300300004300000";
  game.restart();
  game.restoreByTurnAndPieceCodes(turn, pieceCodes);
};

export default RelatiLevel1;
