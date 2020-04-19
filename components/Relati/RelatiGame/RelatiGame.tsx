import React, { useState } from "react";
import Game, { RelatiSymbol } from "../../../libs/Relati";
import { RelatiBoard } from "..";
import { CoordinateObject } from "../../../types";
import { useForceUpdate } from "../../../utils/hook";

export type Props = {
  game?: Game;
  placementEffect?: boolean;
  drawLineDuration?: number;
  lastPieceEmphasized?: boolean;
  onOver?: (symbol?: RelatiSymbol | "N") => void;
};

const RelatiGame = ({ game: externalGame, placementEffect, drawLineDuration, lastPieceEmphasized, onOver }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const forceUpdate = useForceUpdate();
  const [game] = useState<Game>(externalGame || new Game(2));
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.symbolOfWinner !== "?") {
      return;
    }

    game.placeSymbolByCoordinate(x, y);

    if (game.symbolOfWinner !== "?") {
      onOver?.(game.symbolOfWinner);
    }

    if (lastPieceEmphasized && grid?.piece) {
      setLastPieceCoordinate({ x, y });
    }
    else {
      forceUpdate();
    }
  };

  return (
    <>
      <RelatiBoard
        lastPieceEmphasized={lastPieceEmphasized}
        placementEffect={placementEffect}
        drawLineDuration={drawLineDuration}
        board={game.board}
        onGridClick={onGridClick}
        lastPieceCoordinate={lastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer} />
    </>
  );
};

export default RelatiGame;
