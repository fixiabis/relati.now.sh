import { PlayGameComponent } from "./types";
import { RelatiGame, CoordinateObject, useForceUpdate } from "../../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State, UserState } from "../../container/store";
import { useRouter } from "next/router";
import Axios from "Axios";
import QueryString from "querystring";
import firebase from "../../container/firebase";
import GameWaitMatchMessageBox from "./GameWaitMatchMessageBox";
import { GameRoundInfo } from "../../types";
import { RelatiSymbols } from "../../libraries";

const RelatiGameBy2PlayerOnline: PlayGameComponent = ({ size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, ...props }) => {
  const router = useRouter();
  const forceUpdate = useForceUpdate();
  const [roundId, setRoundId] = useState("");
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
      firebase.firestore().collection("rounds").doc(roundId).onSnapshot(roundSnapshot => {
        const { turn, pieces, isOver } = roundSnapshot.data() as GameRoundInfo;
        game.restoreByTurnAndPieceCodes(turn, pieces);

        if (isOver) {
          const winnerSymbol = RelatiSymbols[game.winner] || "N";
          handleOver?.(winnerSymbol);
        }
        else {
          forceUpdate();
        }
      });
    }
    else {
      Axios.post("/api/game", { type: size, playerId }).then(response => {
        const { roundId } = response.data;
        setRoundId(roundId);
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

      <GameWaitMatchMessageBox show={roundId === ""} />
    </>
  );
};

export default RelatiGameBy2PlayerOnline;
