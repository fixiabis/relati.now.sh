import React, { useState, useRef } from "react";
import Game, { RelatiSymbol } from "../../../libs/Relati";
import { RelatiBoard } from "..";
import { CoordinateObject } from "../../../types";
import { useForceUpdate } from "../../../utils/hook";
import { RelatiBoardProps } from "../RelatiBoard";

type OmittedRelatiBoardPropKeys =
  | "board"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  game?: Game;
  onOver?: (symbol?: RelatiSymbol | "N") => void;
  onGridClick?: ({ x, y }: CoordinateObject) => boolean | void;
};

const RelatiGame = ({ game: externalGame, lastPieceEmphasized, onGridClick: externalHandleGridClick, onOver, ...props }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const forceUpdate = useForceUpdate();
  const game = useRef<Game>(externalGame || new Game(2)).current;
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (externalHandleGridClick?.({ x, y }) === false) {
      return;
    }

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
        {...props}
        board={game.board}
        onGridClick={handleGridClick}
        lastPieceCoordinate={lastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer} />
    </>
  );
};

export default RelatiGame;
