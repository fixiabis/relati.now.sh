import { PlayGameComponent } from "./types";
import { RelatiGame, CoordinateObject, useForceUpdate } from "../../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State, UserState } from "../../container/store";
import { useRouter } from "next/router";
import Axios from "axios";
import QueryString from "querystring";
import firebase from "../../container/firebase";
import GameWaitMatchMessageBox from "./GameWaitMatchMessageBox";
import { GameRoundInfo } from "../../types";
import { RelatiSymbols } from "../../libraries";
import { Coordinate } from "gridboard";

const RelatiGameBy2PlayerOnline: PlayGameComponent = ({ type: size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, ...props }) => {
  const router = useRouter();
  const forceUpdate = useForceUpdate();
  const [{ roundId, isRoundReady }, setRoundState] = useState({ roundId: "", isRoundReady: false });
  const setRoundId = (roundId: string) => setRoundState({ roundId, isRoundReady });
  const setIsRoundReady = (isRoundReady: boolean) => setRoundState({ roundId, isRoundReady });
  const leavePage = () => router.replace("/choose-mode?for=game");
  const playerInfo = useSelector<State, UserState["userInfo"]>(state => state.user.userInfo);
  const playerId = playerInfo?.playerId;

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    const body = QueryString.stringify({
      turn: game.turn,
      name: "placement",
      params: `${x},${y}`
    });

    Axios.post(`/api/game/actions?roundId=${roundId}&playerId=${playerId}`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return false;
  };

  useEffect(() => {
    if (!playerInfo) {
      router.replace(`/choose-mode?for=sign-in&then=/play?2p-online%26on=${size}`);
      return;
    }

    if (roundId) {
      const finishHandleSnapshot = firebase.firestore().collection("rounds").doc(roundId).onSnapshot(roundSnapshot => {
        const { turn, pieces, isOver, winner, actions, playerX } = roundSnapshot.data() as GameRoundInfo;

        if (playerX && !isRoundReady) {
          setIsRoundReady(true);
        }

        game.restoreByTurnAndPieceCodes(turn, pieces);

        game.records.splice(
          0,
          game.records.length,
          ...actions.map(action => action.params.split(",").map(Number) as Coordinate)
        );

        if (game.isOver) {
          const winnerSymbol = RelatiSymbols[game.winner] || "N";
          handleOver?.(winnerSymbol);
        }
        else if (isOver) {
          const winnerSymbol = RelatiSymbols[winner] || "N";
          handleOver?.(winnerSymbol);
        }
        else {
          forceUpdate();
        }
      });

      return finishHandleSnapshot;
    }
    else {
      Axios.post("/api/game", { type: size, playerId }).then(response => {
        const { roundId, playerX } = response.data;

        if (playerX) {
          setRoundState({ isRoundReady: true, roundId });
        }
        else {
          setRoundId(roundId);
        }
      });
    }
  });

  return (
    <>
      <RelatiGame
        {...props}
        game={game}
        onGridClick={handleGridClick}
        onOver={handleOver} />

      <GameWaitMatchMessageBox show={!isRoundReady} onReject={leavePage} />
    </>
  );
};

export default RelatiGameBy2PlayerOnline;
