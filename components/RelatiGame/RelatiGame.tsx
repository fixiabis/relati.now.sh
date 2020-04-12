import React, { useState } from "react";
import Game from "../../libs/RelatiGame";
import MessageBox from "../MessageBox";
import RelatiBoard from "../RelatiBoard";
import { useForceUpdate } from "../../utils/hook";

export type Scene = {
  game: Game,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
}

const RelatiGame = () => {
  const forceUpdate = useForceUpdate();
  const [game, setGame] = useState<Game>(new Game(2));
  const restartGame = () => setGame(new Game(2));

  const onGridClick = ({ x, y }) => {
    game.placeSymbolToCoordinate(x, y);
    forceUpdate();
  };

  return (
    <>
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>
      <RelatiBoard visualEffect game={game} onGridClick={onGridClick} />
      <MessageBox show={game.symbolOfWinner !== "?"} onClick={restartGame}>
        {
          game.symbolOfWinner !== "N"
            ? game.symbolOfWinner + " win"
            : "draw"
        }
      </MessageBox>
    </>
  );
};

export default RelatiGame;
