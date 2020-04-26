import React from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";

const RelatiScene7 = ({ nextStep, game, ...props }: Props) => {
  const [x, y] = game.placementRecords[game.placementRecords.length - 1];
  const boardLastPieceCoordinate = { x, y };
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  return (
    <>
      <div className="description">對方也不是省油的燈呢！</div>
      <RelatiBoard
        drawLineDuration={180}
        board={game.board}
        lastPieceCoordinate={boardLastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

export default RelatiScene7;
