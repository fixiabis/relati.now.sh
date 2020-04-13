import React, { useState } from "react";
import Game from "../../libs/RelatiGame";
import MessageBox from "../MessageBox";
import RelatiBoard from "../RelatiBoard";
import { useForceUpdate } from "../../utils/hook";
import Button from "../Button";
import IconButton from "../IconButton";
import "./relati-game.scss";

export type Props = {
  onClose?: () => void,
};

export type Scene = {
  game: Game,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
};

const RelatiGame = ({ onClose }: Props) => {
  const forceUpdate = useForceUpdate();
  const [game, setGame] = useState<Game>(new Game(2));
  const restartGame = () => setGame(new Game(2));

  const onGridClick = ({ x, y }: { x: number, y: number }) => {
    game.placeSymbolToCoordinate(x, y);
    forceUpdate();
  };

  return (
    <div id="relati-game">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>
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
          <IconButton type="reject" color="royalblue" onClick={onClose} />
        </Button.Group>
      </MessageBox>
    </div>
  );
};

export default RelatiGame;
