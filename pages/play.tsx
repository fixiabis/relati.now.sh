import React, { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Game, { RelatiGameRuleX9, RelatiGamePlayerX9, convertBoardToPieceCodes, RelatiGameRule, RelatiGameRuleX5, RelatiGameRuleX7, RelatiGamePlayer, RelatiGamePlayerX5, RelatiGamePlayerX7 } from "../libraries/RelatiGame";
import { Page, Button, IconButton, RelatiGame, useForceUpdate } from "../components";
import { downloadRecordSVGByRelatiGame } from "../utilities/client-side";
import { delay } from "../utilities";
import { useSelector } from "react-redux";
import axios from "axios";
import { State, SettingState } from "../container/store";
import { GameLeaveMessageBox, GameOverMessageBox } from "../page-components/play";

const gameRuleFromSize: Record<number, RelatiGameRule> = {
  5: RelatiGameRuleX5,
  7: RelatiGameRuleX7,
  9: RelatiGameRuleX9,
};

const gamePlayerFromSize: Record<number, RelatiGamePlayer> = {
  5: RelatiGamePlayerX5,
  7: RelatiGamePlayerX7,
  9: RelatiGamePlayerX9,
};

export interface Props {
  size: number;
  level: number;
  rounds: number;
  withPlayer: number;
  playersCount: number;
  versusApi?: string;
  playerOApi?: string;
  playerXApi?: string;
}

const Play: NextPage<Props> = ({ size, level, withPlayer: player, rounds, playersCount, playerOApi, playerXApi, versusApi }) => {
  const router = useRouter();
  const gameRule = gameRuleFromSize[size];
  const gamePlayer = gamePlayerFromSize[size];
  const forceUpdate = useForceUpdate();
  const game = useRef<Game>(new Game(2, gameRule)).current;
  const gameRoundWinners = useRef([] as number[]).current;
  const roundWinsOfO = gameRoundWinners.filter(winner => winner === 0).length;
  const roundWinsOfX = gameRoundWinners.filter(winner => winner === 1).length;
  const [gameRound, setGameRound] = useState(0);
  const [isGameOverMessageBoxOpen, setIsGameOverMessageBoxOpen] = useState(true);
  const [isGameLeaveMessageBoxOpen, setIsGameLeaveMessageBoxOpen] = useState(false);
  const effectSetting = useSelector<State, SettingState["effect"]>(state => state.setting.effect);
  const leavePage = () => router.replace("/choose-mode?for=game");
  const openGameLeaveMessageBox = () => setIsGameLeaveMessageBoxOpen(true);
  const closeGameOverMessageBox = () => setIsGameOverMessageBoxOpen(false);
  const closeGameLeaveMessageBox = () => setIsGameLeaveMessageBoxOpen(false);
  playerOApi = playerOApi || (player === 0 ? "/api/next-step" : versusApi);
  playerXApi = playerXApi || (player === 1 ? "/api/next-step" : versusApi);

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

  const handleGameGridClick = () => {
    if (playersCount === 2) {
      return;
    }

    if (playersCount === 0 || game.getNowPlayer() === player) {
      return false;
    }
  };

  const handleGameAfterGridClick = () => {
    if (playersCount === 0 || playersCount === 2 || game.getNowPlayer() !== player) {
      return;
    }

    const apiUrl = versusApi || "/api/next-step";
    getRequestCancellerFromDoPlacementByApiUrl(apiUrl);
  };

  const getRequestCancellerFromDoPlacementByApiUrl = (apiUrl: string) => {
    const pieceCodes = convertBoardToPieceCodes(game.board);
    const nowPlayer = game.getNowPlayer();
    const canceller = axios.CancelToken.source();
    const cancelToken = canceller.token;
    const apiUrlWithQuery = `${apiUrl}${apiUrl.includes("?") ? "&" : "?"}turn=${game.turn}&pieces=${pieceCodes}&level=${level}`;

    axios.get(apiUrlWithQuery, { cancelToken })
      .then(async ({ data: gridIndex }) => {
        const grid = game.board.grids[gridIndex];

        if (grid) {
          await delay(100);
          game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, nowPlayer);
          game.reenableAllPieces();
          game.checkIsOverAndFindWinner();
          forceUpdate();
        }
      })
      .catch(() => {
        gamePlayer.doPlacementByGameAndPlayer(game, nowPlayer, level);
        game.reenableAllPieces();
        game.checkIsOverAndFindWinner();
        forceUpdate();
      });

    return canceller;
  };

  useEffect(() => {
    if (playersCount === 2 || player === 1 || game.turn !== 0) {
      return;
    }

    const apiUrl = versusApi || "/api/next-step";
    const canceller = getRequestCancellerFromDoPlacementByApiUrl(apiUrl);
    return () => canceller.cancel();
  });

  useEffect(() => {
    if (playersCount !== 0 || game.isOver || !playerOApi || !playerXApi) {
      return;
    }

    const nowPlayer = game.getNowPlayer();
    const apiUrl = nowPlayer === 0 ? playerOApi : playerXApi;
    const canceller = getRequestCancellerFromDoPlacementByApiUrl(apiUrl);
    return () => canceller.cancel();
  });

  useEffect(() => {
    if (playersCount !== 0 || !playerOApi || !playerXApi) {
      return;
    }

    if (game.isOver) {
      const controllerFromPlayerOApiRequest = getRequestCancellerFromDoPlacementByApiUrl(playerOApi);
      const controllerFromPlayerXApiRequest = getRequestCancellerFromDoPlacementByApiUrl(playerXApi);

      return () => {
        controllerFromPlayerOApiRequest.cancel();
        controllerFromPlayerXApiRequest.cancel();
      };
    }
  }, [game.isOver]);

  useEffect(() => {
    if (game.isOver) {
      gameRoundWinners.push(game.winner);

      if (gameRound + 1 !== rounds) {
        game.restart();
        setGameRound(gameRound + 1);
      }
    }
  }, [game.isOver]);

  return (
    <Page id="play" title="play">
      <div className="versus-header">
        <div className="player-o">{roundWinsOfO}</div>
        <div className="versus" />
        <div className="player-x">{roundWinsOfX}</div>
      </div>

      <RelatiGame
        {...effectSetting}
        game={game}
        onGridClick={handleGameGridClick}
        onAfterGridClick={handleGameAfterGridClick}
        onOver={forceUpdate} />

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
    size: parseInt((size as string)?.replace("x", "") || "9"),
    withPlayer: ((symbol as string)?.toUpperCase()) === "O" ? 0 : 1,
    versusApi: versus as string,
    playersCount: "1p" in query ? 1 : "0p" in query ? 0 : 2,
    playerOApi: playerO as string,
    playerXApi: playerX as string,
    rounds: rounds === "Infinity" ? Infinity : parseInt(rounds as string) || 1,
  };
};

export default Play;
