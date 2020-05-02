import React, { useState } from "react";
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

const RelatiGameLite = ({ game: externalGame, lastPieceEmphasized, onGridClick: externalOnGridClick, onOver, ...props }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const forceUpdate = useForceUpdate();
  const [game] = useState<GameLite>(externalGame || new GameLite(2));
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (externalOnGridClick?.({ x, y }) === false) {
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
        onGridClick={onGridClick}
        lastPieceCoordinate={lastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer} />
    </>
  );
};

export default RelatiGameLite;
