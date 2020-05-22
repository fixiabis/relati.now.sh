import React, { useState, useRef } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Game, { RelatiGameRuleX9, RelatiSymbols, RelatiGamePlayerX9 } from "../libraries/RelatiGame";
import { RelatiGame, RelatiPiece } from "../components/Relati";
import { Page, Button, IconButton, MessageBox, useForceUpdate, CoordinateObject } from "../components";
import { useSelector } from "react-redux";
import { State, SettingState } from "../reducers";

export interface Props {
  level?: number;
}

const Play1pOnX9WithO: NextPage<Props> = ({ level = 1 }) => {
  const router = useRouter();
  const forceUpdate = useForceUpdate();
  const game = useRef<Game>(new Game(2, RelatiGameRuleX9)).current;
  const [isGameOverMessageBoxShow, setIsGameOverMessageBoxShow] = useState(true);
  const [isGameLeaveMessageBoxShow, setIsGameLeaveMessageBoxShow] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const leavePage = () => router.replace("/choose-game-mode");
  const openGameLeaveMessageBox = () => setIsGameLeaveMessageBoxShow(true);
  const closeGameOverMessageBox = () => setIsGameOverMessageBoxShow(false);
  const closeGameLeaveMessageBox = () => setIsGameLeaveMessageBoxShow(false);

  const restartGame = () => {
    game.restart();
    forceUpdate();
  };

  const leaveGame = () => {
    if (game.turn && !game.isOver) {
      openGameLeaveMessageBox();
    }
    else {
      leavePage();
    }
  };

  const saveGame = () => {
    const placementRecords = game.placementRecords.map(([x, y]) => game.board.getGridAt(x, y)?.i);
    const placementRecordsJSONText = JSON.stringify(placementRecords);
    const fileType = "text/json";
    const file = new Blob([placementRecordsJSONText], { type: fileType });
    const fileUrl = URL.createObjectURL(file);
    const nowTime = Date.now();
    const fileName = `relati-record-at-${nowTime}.json`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gameOverMessageText =
    game.isOver
      ? game.winner !== -1
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
    isGameOverMessageBoxShow && game.isOver
      ? (
        <MessageBox onCancel={closeGameOverMessageBox}>
          <div className="message-container">
            <div className="message-icon">
              <svg width="5" height="5">
                <RelatiPiece x={0} y={0} symbol={RelatiSymbols[game.winner] || "N"} primary />
              </svg>
            </div>
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

  const handleGameGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayer() === 0) {
      return false;
    }
  };

  const handleGameAfterGridClick = () => {
    if (game.getNowPlayer() !== 0) {
      return;
    }

    RelatiGamePlayerX9.doPlacementByGameAndPlayer(game, 0, level);
    game.checkIsOverAndFindWinner();
    forceUpdate();
  };

  RelatiGamePlayerX9.doPlacementByGameAndPlayer(game, 0, level);

  return (
    <Page id="play" title="play">
      <div className="versus-header">
        <div className="player-o" />
        <div className="versus" />
        <div className="player-x" />
      </div>

      <RelatiGame
        {...effectSetting}
        game={game}
        onGridClick={handleGameGridClick}
        onAfterGridClick={handleGameAfterGridClick}
        onOver={forceUpdate} />

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leaveGame} />
      </Button.Group>

      {gameLeaveMessageBox}
      {gameOverMessageBox}
    </Page>
  );
};

Play1pOnX9WithO.getInitialProps = async ({ query: { level } }) => {
  return { level: parseInt(level as string || "1") };
};

export default Play1pOnX9WithO;
