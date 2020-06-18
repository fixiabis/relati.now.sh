import React, { useState, useEffect } from "react";
import { RelatiBoard } from "./components";
import { LevelComponent, CoordinateObject } from "./types";
import { useForceUpdate, useTimeout } from "../../../hooks";
import { HasPieceRelatiGrid } from "../../../../libraries";

const RelatiLevel5: LevelComponent = ({ toLevel, onFailed: handleFailed, game, ...props }) => {
  const [description, setDescription] = useState("保護自己的區域!");
  const forceUpdate = useForceUpdate();

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, 1);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (x === 3 && y === 0) {
      setDescription("做得好! 保護了自己的區域!");
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 13) {
      setDescription("保護自己的區域!");
    }
  });

  useTimeout(() => {
    if (game.turn < 14) {
      return;
    }

    const grid = game.board.getGridAt(3, 0) as HasPieceRelatiGrid;

    if (!grid.piece) {
      game.doPlacementByCoordinateAndPlayer(3, 0, 0);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
      setDescription("失敗了! 對方侵入了你的區域!");
      handleFailed("失敗了! 對方侵入了你的區域!");
    }
    else if (grid.piece.symbol === "X") {
      toLevel("END");
    }
  }, 1000);

  return (
    <>
      <div className="description" key={description}>{description}</div>
      <RelatiBoard game={game} onGridClick={handleGridClick} {...props} drawLineDuration={0} />
    </>
  );
};

RelatiLevel5.initial = (game) => {
  const turn = 13;
  const pieceCodes = "0030000340031203344004340";
  game.restart();
  game.restoreByTurnAndPieceCodes(turn, pieceCodes);
};

export default RelatiLevel5;
