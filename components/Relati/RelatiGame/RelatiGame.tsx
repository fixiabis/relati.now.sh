import React, { useState } from "react";
import Game, { RelatiSymbol } from "../../../libs/Relati";
import MessageBox from "../../MessageBox";
import { RelatiBoard } from "..";
import Button from "../../Button";
import IconButton from "../../IconButton";
import { CoordinateObject } from "../../../types";

export type Props = {
  onLeave?: () => void,
  onOver?: (symbol: RelatiSymbol | "N") => void,
};

const RelatiGame = ({ onLeave, onOver }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const [game, setGame] = useState<Game>(new Game(2));

  const restartGame = () => {
    onOver?.(game.symbolOfWinner as RelatiSymbol | "N");
    setGame(new Game(2));
  };

  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);
    game.placeSymbolByCoordinate(x, y);

    if (grid?.piece) {
      setLastPieceCoordinate({ x, y });
    }
  };

  return (
    <>
      <RelatiBoard
        hasTransition
        board={game.board}
        onGridClick={onGridClick}
        lastPieceCoordinate={lastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer} />

      <MessageBox show={game.symbolOfWinner !== "?"}>
        <div style={{ textAlign: "center" }}>
          {
            game.symbolOfWinner !== "N"
              ? game.symbolOfWinner + " win"
              : "draw"
          }
        </div>
        <Button.Group>
          <IconButton type="retry" color="crimson" onClick={restartGame} />
          <IconButton type="reject" color="royalblue" onClick={onLeave} />
        </Button.Group>
      </MessageBox>
    </>
  );
};

export default RelatiGame;
