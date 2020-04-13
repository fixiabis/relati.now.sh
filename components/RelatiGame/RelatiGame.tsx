import React, { useState } from "react";
import Game from "../../libs/RelatiGame";
import MessageBox from "../MessageBox";
import RelatiBoard from "../RelatiBoard";
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

  const onGridClick = ({ x, y }: { x: number, y: number }) => {
    game.placeSymbolToCoordinate(x, y);
    forceUpdate();
  };

  return (
    <div id="relati-game">
      <RelatiBoard visually game={game} onGridClick={onGridClick} />
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
