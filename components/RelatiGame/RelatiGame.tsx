import React, { useState } from "react";
import Game from "../../libs/RelatiGame";
import MessageBox from "../MessageBox";
import * as Relati from "../Relati";
import { useForceUpdate } from "../../utils/hook";
import Button from "../Button";
import IconButton from "../IconButton";
import "./relati-game.scss";

export type Props = {
  onOver?: () => void,
};

export type Scene = {
  game: Game,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
};

const RelatiGame = ({ onOver }: Props) => {
  const forceUpdate = useForceUpdate();
  const [game, setGame] = useState<Game>(new Game(2));
  const restartGame = () => setGame(new Game(2));
  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: { x: number, y: number }) => {
    game.placeSymbolToCoordinate(x, y);
    forceUpdate();
  };

  return (
    <div id="relati-game">
      <Relati.Board
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
          <IconButton type="reject" color="royalblue" onClick={onOver} />
        </Button.Group>
      </MessageBox>
    </div>
  );
};

export default RelatiGame;
