import React, { useState } from "react";
import { useRouter } from "next/router";
import Game from "../libs/Relati";
import { Page, Button, IconButton, RelatiGame, MessageBox, RelatiPiece } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";
import { useForceUpdate } from "../utils/hook";

const Play = () => {
  const router = useRouter();
  const [game] = useState<Game>(new Game(2));
  const forceUpdate = useForceUpdate();
  const gameOnOver = forceUpdate;
  const [messageBoxShow, setMessageBoxShow] = useState(true);
  const messageBoxOnCancel = () => setMessageBoxShow(false);
  const gameSetting = useSelector<State, SettingState>(state => state.setting);

  const restartGame = () => {
    game.restart();
    forceUpdate();
  };

  const leaveGame = () => router.replace("/");

  const messageIcon = game.symbolOfWinner !== "?"
    ? (
      <div className="message-icon-container">
        <svg width="5" height="5" className="message-icon">
          <RelatiPiece x={0} y={0} symbol={game.symbolOfWinner} primary />
        </svg>
      </div>
    )
    : undefined;

  const messageText = game.symbolOfWinner !== "?"
    ? game.symbolOfWinner !== "N"
      ? `${game.turn % 2 ? "藍" : "紅"}方玩家獲勝`
      : "平手"
    : "";

  const saveGame = () => {
    const file = new Blob([JSON.stringify(game.placementRecords)], { type: "text/json" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "relati-record.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Page id="play" title="Play">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>

      <RelatiGame {...gameSetting} game={game} onOver={gameOnOver} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={leaveGame} />
      </Button.Group>

      <MessageBox show={messageBoxShow && game.symbolOfWinner !== "?"} onCancel={messageBoxOnCancel}>
        <div className="message-container">
          {messageIcon}
          {messageText}
        </div>
        <Button.Group>
          <IconButton type="retry" color="crimson" onClick={restartGame} />
          <IconButton type="download" color="#888" onClick={saveGame} />
          <IconButton type="reject" color="royalblue" onClick={leaveGame} />
        </Button.Group>
      </MessageBox>
    </Page>
  );
};

export default Play;
