import React, { useState, useRef } from "react";
import RelatiBoard, { RelatiBoardProps } from "../RelatiBoard";
import { CoordinateObject } from "../../Board";
import Game, { RelatiSymbol, RelatiGameRuleX9, RelatiSymbols } from "../../../libraries/RelatiGame";
import { useForceUpdate } from "../../hooks";

type OmittedRelatiBoardPropKeys =
  | "game"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  game?: Game;
  onOver?: (symbol?: RelatiSymbol | "N") => void;
  onGridClick?: ({ x, y }: CoordinateObject) => boolean | void;
};

const RelatiGame = ({ game: externalGame, lastPieceEmphasized: isLastPieceEmphasized, onGridClick: externalHandleGridClick, onOver, ...props }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const forceUpdate = useForceUpdate();
  const game = useRef<Game>(externalGame || new Game(2, RelatiGameRuleX9)).current;

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (externalHandleGridClick?.({ x, y }) === false) {
      return;
    }

    const grid = game.board.getGridAt(x, y);
    const nowPlayer = game.getNowPlayer();

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinateAndPlayer(x, y, nowPlayer);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (game.isOver) {
      const nowPlayerSymbol = RelatiSymbols[nowPlayer];
      onOver?.(nowPlayerSymbol);
    }

    if (grid?.piece && isLastPieceEmphasized) {
      setLastPieceCoordinate({ x, y });
    }
    else {
      forceUpdate();
    }
  };

  return (
    <>
      <RelatiBoard
        lastPieceEmphasized={isLastPieceEmphasized}
        {...props}
        game={game}
        onGridClick={handleGridClick}
        lastPieceCoordinate={lastPieceCoordinate} />
    </>
  );
};

export default RelatiGame;
