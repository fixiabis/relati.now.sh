import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import GameLite from "../libs/RelatiLite";
import { Page, Button, IconButton, RelatiGameLite, MessageBox, RelatiPiece } from "../components";
import { useSelector } from "react-redux";
import { State } from "../reducers";
import { SettingState } from "../reducers/setting";
import { useForceUpdate } from "../utils/hook";

const PlayLite = () => {
  const router = useRouter();
  const forceUpdate = useForceUpdate();
  const game = useRef<GameLite>(new GameLite(2)).current;
  const [isGameOverMessageBoxShow, setIsGameOverMessageBoxShow] = useState(true);
  const [isGameLeaveMessageBoxShow, setIsGameLeaveMessageBoxShow] = useState(false);
  const gameSetting = useSelector<State, SettingState>(state => state.setting);
  const leavePage = () => router.replace("/choose-play-mode");
  const openGameLeaveMessageBox = () => setIsGameLeaveMessageBoxShow(true);
  const closeGameOverMessageBox = () => setIsGameOverMessageBoxShow(false);
  const closeGameLeaveMessageBox = () => setIsGameLeaveMessageBoxShow(false);

  const restartGame = () => {
    game.restart();
    forceUpdate();
  };

  const leaveGame = () => {
    if (game.turn && game.symbolOfWinner === "?") {
      openGameLeaveMessageBox();
    }
    else {
      leavePage();
    }
  };

  const saveGame = () => {
    const placementRecords = game.placementRecords.map(([x, y]) => game.board.getGridAt(x, y)?.i || -1);
    const placementRecordsJSONText = JSON.stringify(placementRecords);
    const fileType = "text/json";
    const file = new Blob([placementRecordsJSONText], { type: fileType });
    const fileUrl = URL.createObjectURL(file);
    const nowTime = Date.now();
    const fileName = `relati-lite-record-at-${nowTime}.json`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gameOverMessageIcon =
    game.symbolOfWinner !== "?"
      ? (
        <div className="message-icon-container">
          <svg width="5" height="5" className="message-icon">
            <RelatiPiece x={0} y={0} symbol={game.symbolOfWinner} primary />
          </svg>
        </div>
      )
      : undefined;

  const gameOverMessageText =
    game.symbolOfWinner !== "?"
      ? game.symbolOfWinner !== "N"
        ? `${game.turn % 2 ? "藍" : "紅"}方玩家獲勝!`
        : "平手!"
      : undefined;

  const gameLeaveMessageIconStyle = { backgroundImage: "url(/icons/help.svg)" };

  const gameLeaveMessageBox =
    isGameLeaveMessageBoxShow
      ? (
        <MessageBox onCancel={closeGameLeaveMessageBox}>
          <div className="message-container">
              <div className="message-icon" style={gameLeaveMessageIconStyle} />
              勝負未分, 確定離開?
          </div>
          <Button.Group>
            <IconButton type="accept" color="crimson" onClick={leavePage} />
            <IconButton type="download" color="#888" onClick={saveGame} />
            <IconButton type="reject" color="royalblue" onClick={closeGameLeaveMessageBox} />
          </Button.Group>
        </MessageBox>
      )
      : undefined;

  const gameOverMessageBox =
    isGameOverMessageBoxShow && game.symbolOfWinner !== "?"
      ? (
        <MessageBox onCancel={closeGameOverMessageBox}>
          <div className="message-container">
            {gameOverMessageIcon}
            {gameOverMessageText}
          </div>
          <Button.Group>
            <IconButton type="retry" color="crimson" onClick={restartGame} />
            <IconButton type="download" color="#888" onClick={saveGame} />
            <IconButton type="reject" color="royalblue" onClick={leaveGame} />
          </Button.Group>
        </MessageBox>
      )
      : undefined;

  return (
    <Page id="play-lite" title="play lite">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>

      <RelatiGameLite {...gameSetting} game={game} onOver={forceUpdate} />

      <Button.Group>
        <IconButton type="leave" color="#888" onClick={leaveGame} />
      </Button.Group>

      {gameLeaveMessageBox}
      {gameOverMessageBox}
    </Page>
  );
};

export default PlayLite;
