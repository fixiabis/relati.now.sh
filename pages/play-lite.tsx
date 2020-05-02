import React, { useState } from "react";
import { useRouter } from "next/router";
import GameLite from "../libs/RelatiLite";
import { Page, Button, IconButton, RelatiGameLite, MessageBox, RelatiPiece } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";
import { useForceUpdate } from "../utils/hook";

const PlayLite = () => {
  const router = useRouter();
  const [game] = useState<GameLite>(new GameLite(2));
  const forceUpdate = useForceUpdate();
  const [isGameOverMessageBoxShow, setIsGameOverMessageBoxShow] = useState(true);
  const [isGameLeaveMessageBoxShow, setIsGameLeaveMessageBoxShow] = useState(false);
  const gameSetting = useSelector<State, SettingState>(state => state.setting);
  const gameOnOver = forceUpdate;
  const gameLeaveMessageBoxOpen = () => setIsGameLeaveMessageBoxShow(true);
  const gameOverMessageBoxClose = () => setIsGameOverMessageBoxShow(false);
  const gameLeaveMessageBoxClose = () => setIsGameLeaveMessageBoxShow(false);

  const restartGame = () => {
    game.restart();
    forceUpdate();
  };

  const leaveGame = () => {
    if (game.turn && game.symbolOfWinner === "?") {
      gameLeaveMessageBoxOpen();
    }
    else {
      router.replace("/");
    }
  };

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
      ? `${game.turn % 2 ? "藍" : "紅"}方玩家獲勝!`
      : "平手!"
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
    <Page id="play" title="play">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>

      <RelatiGameLite {...gameSetting} game={game} onOver={gameOnOver} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={leaveGame} />
      </Button.Group>

      <MessageBox show={isGameLeaveMessageBoxShow} onCancel={gameLeaveMessageBoxClose}>
        <div className="message-container">
          <div className="message-icon-container">
            <svg width="5" height="5" className="message-icon">
              <RelatiPiece x={0} y={0} symbol="K" primary />
            </svg>
          </div>
          勝負未分, 確定離開?
        </div>
        <Button.Group>
          <IconButton type="accept" color="crimson" onClick={() => router.replace("/")} />
          <IconButton type="download" color="#888" onClick={saveGame} />
          <IconButton type="reject" color="royalblue" onClick={gameLeaveMessageBoxClose} />
        </Button.Group>
      </MessageBox>

      <MessageBox show={isGameOverMessageBoxShow && game.symbolOfWinner !== "?"} onCancel={gameOverMessageBoxClose}>
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

export default PlayLite;
