import { PlayGameComponent } from "./types";
import { RelatiGame, CoordinateObject, useForceUpdate } from "../../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State, UserState } from "../../container/store";
import { useRouter } from "next/router";
import Axios from "axios";
import QueryString from "querystring";
import firebase from "../../container/firebase";
import { GameRoundInfo } from "../../types";
import { RelatiSymbols } from "../../libraries";
import { Coordinate } from "gridboard";

const RelatiGameBy2PlayerOnline: PlayGameComponent = ({ type: size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, roundId, ...props }) => {
  const router = useRouter();
  const forceUpdate = useForceUpdate();
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
    }).then(response => {
      if (response.data) {
        game.doPlacementByCoordinate(x, y);
        game.reenableAllPieces();
        forceUpdate();
      }
    });

    return false;
  };

  useEffect(() => {
    if (!playerInfo) {
      router.replace(`/choose-mode?for=sign-in&then=/play?2p-online%26on=${size}%26at=${roundId}`);
      return;
    }

    if (!roundId) {
      router.replace(`/wait-for-opponent?on=${size}`);
      return;
    }

    const abortForSnapshotHandling = firebase.firestore().collection("rounds").doc(roundId).onSnapshot(roundSnapshot => {
      const { turn, pieces, isOver, winner, actions } = roundSnapshot.data() as GameRoundInfo;

      if (game.turn !== turn) {
        game.restoreByTurnAndPieceCodes(turn, pieces);
        game.isOver = isOver;
        game.winner = winner;

        game.records.splice(
          0,
          game.records.length,
          ...actions.map(action => action.params.split(",").map(Number) as Coordinate)
        );
        
        forceUpdate();
      }

      if (game.isOver) {
        const winnerSymbol = RelatiSymbols[game.winner] || "N";
        handleOver?.(winnerSymbol);
      }
    });

    return abortForSnapshotHandling;
  });

  return (
    <RelatiGame
      {...props}
      game={game}
      onGridClick={handleGridClick}
      onOver={handleOver} />
  );
};

export default RelatiGameBy2PlayerOnline;
