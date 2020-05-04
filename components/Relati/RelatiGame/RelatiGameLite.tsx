import React, { useState, useRef } from "react";
import GameLite, { RelatiSymbol } from "../../../libs/RelatiLite";
import { Lite as RelatiBoardLite } from "../RelatiBoard";
import { CoordinateObject } from "../../../types";
import { useForceUpdate } from "../../../utils/hook";
import { RelatiBoardProps } from "../RelatiBoard";

type OmittedRelatiBoardPropKeys =
  | "board"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  game?: GameLite;
  onOver?: (symbol?: RelatiSymbol | "N") => void;
  onGridClick?: ({ x, y }: CoordinateObject) => boolean | void;
};

const RelatiGameLite = ({ game: externalGame, lastPieceEmphasized, onGridClick: externalHandleGridClick, onOver, ...props }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const forceUpdate = useForceUpdate();
  const game = useRef<GameLite>(externalGame || new GameLite(2)).current;
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
      <RelatiBoardLite
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

export default RelatiGameLite;
