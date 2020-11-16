import { PlayGameComponent } from "./types";
import { RelatiGame, CoordinateObject, useForceUpdate } from "../../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PageState, State, UserState } from "../../container/store";
import { useRouter } from "next/router";
import { RelatiSymbols } from "../../libraries";
import ArenaSocketClient from "../../libraries/ArenaSocketClient";

const RelatiGameBy2PlayerOnline: PlayGameComponent = ({ type: size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, roundId, ...props }) => {
  const router = useRouter();
  const onlineInfo = useSelector<State, PageState["play"]["online"]>(state => state.page.play.online);
  const forceUpdate = useForceUpdate();
  const playerInfo = useSelector<State, UserState["userInfo"]>(state => state.user.userInfo);

  const handleGridClick = ({ x, y }: CoordinateObject) => {
    if (!onlineInfo.opponent) {
      return false;
    }

    const player = game.getNowPlayer();

    if (onlineInfo.ownedSymbol !== RelatiSymbols[player]) {
      return false;
    }

    game.doPlacementByCoordinate(x, y);
    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (game.isOver) {
      const winnerSymbol = RelatiSymbols[game.winner] || "N";
      handleOver?.(winnerSymbol);
    }

    forceUpdate();
    
    ArenaSocketClient.emit("symbol.set", {
      id: onlineInfo.opponent.playerId,
      crd: {x, y}
    });

    return false;
  };

  useEffect(() => {
    if (!playerInfo) {
      router.replace(`/choose-mode?for=sign-in&then=/play?2p-online%26on=${size}`);
      return;
    }

    if (!onlineInfo.opponent) {
      router.replace(`/wait-for-opponent?on=${size}`);
      return;
    }

    ArenaSocketClient.on('symbol.set', ({ x, y }: { x: number, y: number }) => {
      console.log(x, y);
      game.doPlacementByCoordinate(x, y);
      game.reenableAllPieces();
      game.checkIsOverAndFindWinner();
  
      if (game.isOver) {
        const winnerSymbol = RelatiSymbols[game.winner] || "N";
        handleOver?.(winnerSymbol);
      }
      forceUpdate();
    });

    ArenaSocketClient.on('user.leave', () => {
      console.log('leaved');
      game.isOver = true;
      game.winner = RelatiSymbols.indexOf(onlineInfo.ownedSymbol as "O" | "X");
      handleOver?.(onlineInfo.ownedSymbol || "N");
    });

    return () => {
      ArenaSocketClient.off('symbol.set');
      ArenaSocketClient.off('user.leave');
    };
  }, []);

  return (
    <RelatiGame
      {...props}
      game={game}
      onGridClick={handleGridClick}
      onOver={handleOver} />
  );
};

export default RelatiGameBy2PlayerOnline;
