import React, { useState, useRef } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RelatiGame, RelatiGameRuleX9, RelatiGameRule, RelatiGameRuleX5, RelatiGameRuleX7 } from "../libraries";
import { Page, Button, IconButton, useForceUpdate } from "../components";
import { downloadRecordSVGByRelatiGame } from "../utilities/client-side";
import { useSelector } from "react-redux";
import { State, SettingState } from "../container/store";
import { GameLeaveMessageBox, GameOverMessageBox, PlayGameComponent, RelatiGameBy1Player, RelatiGameBy2Player, RelatiGameBy0Player } from "../page-components/play";

const gameRuleFromSize: Record<string, RelatiGameRule> = {
  "x5": RelatiGameRuleX5,
  "x7": RelatiGameRuleX7,
  "x9": RelatiGameRuleX9,
};

const GameFromMode: Record<string, PlayGameComponent> = {
  "0p": RelatiGameBy0Player,
  "1p": RelatiGameBy1Player,
  "2p": RelatiGameBy2Player,
};

export interface Props {
  size?: string;
  mode: string;
  level: number;
  rounds: number;
  withPlayer: number;
  versusApi?: string;
  playerOApi?: string;
  playerXApi?: string;
}

const Play: NextPage<Props> = ({ size = "x9", level, withPlayer: opponentOfPlayer, rounds, mode, playerOApi, playerXApi, versusApi }) => {
  const router = useRouter();
  const gameRule = gameRuleFromSize[size];
  const forceUpdate = useForceUpdate();
  const Game = GameFromMode[mode];
  const game = useRef<RelatiGame>(new RelatiGame(2, gameRule)).current;
  const [gameRound, setGameRound] = useState(0);
  const gameRoundWinners = useRef([] as number[]).current;
  const roundWinsOfO = gameRoundWinners.filter(winner => winner === 0).length;
  const roundWinsOfX = gameRoundWinners.filter(winner => winner === 1).length;
  const [isGameOverMessageBoxOpen, setIsGameOverMessageBoxOpen] = useState(true);
  const [isGameLeaveMessageBoxOpen, setIsGameLeaveMessageBoxOpen] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const leavePage = () => router.replace("/choose-mode?for=game");
  const openGameLeaveMessageBox = () => setIsGameLeaveMessageBoxOpen(true);
  const closeGameOverMessageBox = () => setIsGameOverMessageBoxOpen(false);
  const closeGameLeaveMessageBox = () => setIsGameLeaveMessageBoxOpen(false);
  playerOApi = playerOApi || (opponentOfPlayer === 0 ? "/api/next-step" : versusApi);
  playerXApi = playerXApi || (opponentOfPlayer === 1 ? "/api/next-step" : versusApi);

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

  const saveGame = () => downloadRecordSVGByRelatiGame(game);

  const handleGameOver = () => {
    gameRoundWinners.push(game.winner);

    if (gameRound + 1 !== rounds) {
      game.restart();
      setGameRound(gameRound + 1);
    }
    else {
      forceUpdate();
    }
  };

  return (
    <Page id="play" title={`play${rounds > 1 ? ` (${roundWinsOfO}:${roundWinsOfX})` : ""}`}>
      <div className="versus-header">
        <div className="player-o"></div>
        <div className="versus" />
        <div className="player-x"></div>
      </div>

      <Game
        {...effectSetting}
        size={size}
        level={level}
        rounds={rounds}
        playerOApi={playerOApi}
        playerXApi={playerXApi}
        opponentOfPlayer={opponentOfPlayer}
        game={game}
        onOver={handleGameOver} />

      <GameLeaveMessageBox
        show={isGameLeaveMessageBoxOpen}
        onCancel={closeGameLeaveMessageBox}
        onAccept={leavePage}
        onReject={closeGameLeaveMessageBox}
        onDownload={saveGame} />

      <GameOverMessageBox
        game={game}
        show={isGameOverMessageBoxOpen && game.isOver}
        onCancel={closeGameOverMessageBox}
        onRetry={restartGame}
        onLeave={leaveGame}
        onDownload={saveGame} />

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={leaveGame} />
      </Button.Group>
    </Page>
  );
};

Play.getInitialProps = async ({ query, query: { level, on: size, with: symbol, rounds, versus, playerO, playerX } }) => {
  return {
    level: parseInt(level as string || "1"),
    size: size as string | undefined,
    withPlayer: ((symbol as string)?.toUpperCase()) === "O" ? 0 : 1,
    versusApi: versus as string,
    mode:
      "1p" in query
        ? "1p"
        : "0p" in query
          ? "0p"
          : "2p",
    playerOApi: playerO as string,
    playerXApi: playerX as string,
    rounds: rounds === "Infinity" ? Infinity : parseInt(rounds as string) || 1,
  };
};

export default Play;
