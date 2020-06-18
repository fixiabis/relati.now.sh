import React, { useState, useEffect } from "react";
import { RelatiBoard } from "./components";
import { LevelComponent, CoordinateObject } from "./types";
import { useForceUpdate, useTimeout } from "../../../hooks";
import { HasPieceRelatiGrid } from "../../../../libraries";

const RelatiLevel4: LevelComponent = ({ toLevel, onFailed: handleFailed, game, ...props }) => {
  const [description, setDescription] = useState("侵入對方的區域!");
  const forceUpdate = useForceUpdate();

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, 1);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (x === 4 && y === 2) {
      setDescription("做得好! 侵入了對方的區域!");
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 13) {
      setDescription("侵入對方的區域!");
    }
  });

  useTimeout(() => {
    if (game.turn < 14) {
      return;
    }

    const grid = game.board.getGridAt(4, 2) as HasPieceRelatiGrid;

    if (!grid.piece) {
      game.doPlacementByCoordinateAndPlayer(4, 2, 0);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
      setDescription("失敗了! 對方佔有了比你大的區域!");
      handleFailed("失敗了! 對方佔有了比你大的區域!");
    }
    else if (grid.piece.symbol === "X") {
      toLevel("5");
    }
  }, 1000);

  return (
    <>
      <div className="description" key={description}>{description}</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} drawLineDuration={0} />
    </>
  );
};

RelatiLevel4.initial = (game) => {
  const turn = 13;
  const pieceCodes = "0000033100443300424300043";
  game.restart();
  game.restoreByTurnAndPieceCodes(turn, pieceCodes);
};

export default RelatiLevel4;
