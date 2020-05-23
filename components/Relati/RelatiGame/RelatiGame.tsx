import React, { useRef } from "react";
import RelatiBoard, { Props as RelatiBoardProps } from "../RelatiBoard";
import { CoordinateObject } from "../../Board";
import Game, { RelatiSymbol, RelatiGameRuleX9, RelatiSymbols } from "../../../libraries/RelatiGame";
import { useForceUpdate } from "../../hooks";

type OmittedRelatiBoardPropKeys =
  | "game"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  game?: Game;
  onOver?: (symbol?: RelatiSymbol | "N") => void;
  onGridClick?: ({ x, y }: CoordinateObject) => boolean | void;
};

const RelatiGame = ({ game: externalGame, lastPieceEmphasized: isLastPieceEmphasized, onGridClick: externalHandleGridClick, onOver, ...props }: Props) => {
  const forceUpdate = useForceUpdate();
  const game = useRef<Game>(externalGame || new Game(2, RelatiGameRuleX9)).current;

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (externalHandleGridClick?.({ x, y }) === false) {
      return;
    }

    const grid = game.board.getGridAt(x, y);

    if (grid?.piece || game.isOver) {
      return;
    }

    game.doPlacementByCoordinate(x, y);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (game.isOver) {
      const winnerSymbol = RelatiSymbols[game.winner] || "N";
      onOver?.(winnerSymbol);
    }

    forceUpdate();
  };

  return (
    <>
      <RelatiBoard
        lastPieceEmphasized={isLastPieceEmphasized}
        {...props}
        game={game}
        onGridClick={handleGridClick} />
    </>
  );
};

export default RelatiGame;
