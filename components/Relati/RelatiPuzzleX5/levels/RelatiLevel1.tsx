import React, { useState, useEffect } from "react";
import { RelatiBoard } from "./components";
import { LevelComponent, CoordinateObject } from "./types";
import { useForceUpdate, useTimeout } from "../../../hooks";
import { HasPieceRelatiGrid } from "../../../../libraries";

const RelatiLevel1: LevelComponent = ({ toLevel, onFailed: handleFailed, game, ...props }) => {
  const [description, setDescription] = useState("讓對方沒有下一步!");
  const forceUpdate = useForceUpdate();

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, 1);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (x === 3 && y === 4) {
      setDescription("做得好! 對方沒辦法繼續放了!");
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 9) {
      setDescription("讓對方沒有下一步!");
    }
  });

  useTimeout(() => {
    if (game.turn < 10) {
      return;
    }

    const grid = game.board.getGridAt(3, 4) as HasPieceRelatiGrid;

    if (!grid.piece) {
      game.doPlacementByCoordinateAndPlayer(3, 4, 0);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
      setDescription("失敗了! 對方還是可以繼續放!");
      handleFailed("失敗了! 對方還是可以繼續放!");
    }
    else if (grid.piece.symbol === "X") {
      toLevel("2");
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
  const turn = 9;
  const pieceCodes = "0002100043000430004300003";
  game.restart();
  game.restoreByTurnAndPieceCodes(turn, pieceCodes);
};

export default RelatiLevel1;
