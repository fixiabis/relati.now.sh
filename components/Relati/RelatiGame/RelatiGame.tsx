import React, { useState } from "react";
import Game, { RelatiSymbol } from "../../../libs/Relati";
import MessageBox from "../../MessageBox";
import { RelatiBoard } from "..";
import { useForceUpdate } from "../../../utils/hook";
import Button from "../../Button";
import IconButton from "../../IconButton";
import "./relati-game.scss";

export type Props = {
  onLeave?: () => void,
  onOver?: (symbol: RelatiSymbol | "N") => void,
};

const RelatiGame = ({ onLeave, onOver }: Props) => {
  const forceUpdate = useForceUpdate();
  const [game, setGame] = useState<Game>(new Game(2));

  const restartGame = () => {
    onOver?.(game.symbolOfWinner as RelatiSymbol | "N");
    setGame(new Game(2));
  };

  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: { x: number, y: number }) => {
    game.placeSymbolByCoordinate(x, y);
    forceUpdate();
  };

  return (
    <div id="relati-game">
      <RelatiBoard
        hasTransition
        board={game.board}
        onGridClick={onGridClick}
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
    </div>
  );
};

export default RelatiGame;
