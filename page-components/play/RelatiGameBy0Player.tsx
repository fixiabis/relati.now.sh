import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { PlayGameComponent } from "./types";
import { RelatiGame, useForceUpdate } from "../../components";
import { RelatiGamePlayer, RelatiGamePlayerX5, RelatiGamePlayerX7, RelatiGamePlayerX9, convertBoardToPieceCodes, RelatiSymbols } from "../../libraries";
import { delay } from "../../utilities";

const gameOpponentOfPlayerFromSize: Record<string, RelatiGamePlayer> = {
  "x5": RelatiGamePlayerX5,
  "x7": RelatiGamePlayerX7,
  "x9": RelatiGamePlayerX9,
};

const RelatiGameBy0Player: PlayGameComponent = ({ type: size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, ...props }) => {
  const forceUpdate = useForceUpdate();
  const gameOpponentOfPlayer = gameOpponentOfPlayerFromSize[size];
  const handleGridClick = () => false;

  useEffect(() => {
    if (game.isOver || !playerOApi || !playerXApi) {
      return;
    }

    const pieceCodes = convertBoardToPieceCodes(game.board);
    const nowPlayer = game.getNowPlayer();
    const apiUrl = nowPlayer === 0 ? playerOApi : playerXApi;
    const apiUrlWithQuery = `${apiUrl}${apiUrl.includes("?") ? "&" : "?"}turn=${game.turn}&pieces=${pieceCodes}&level=${level}`;

    Axios.get(apiUrlWithQuery)
      .then(async ({ data: gridIndex }) => {
        const grid = game.board.grids[gridIndex];

        if (!grid) {
          return;
        }

        await delay(100);
        game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, nowPlayer);
      })
      .catch(() => {
        gameOpponentOfPlayer.doPlacementByGameAndPlayer(game, nowPlayer, level);
      })
      .then(() => {
        game.reenableAllPieces();
        game.checkIsOverAndFindWinner();

        if (game.isOver) {
          const winnerSymbol = RelatiSymbols[game.winner] || "N";
          handleOver?.(winnerSymbol);

          const pieceCodes = convertBoardToPieceCodes(game.board);
          const playerOApiWithQuery = `${playerOApi}${playerOApi.includes("?") ? "&" : "?"}turn=${game.turn}&pieces=${pieceCodes}&level=${level}`;
          const playerXApiWithQuery = `${playerXApi}${playerXApi.includes("?") ? "&" : "?"}turn=${game.turn}&pieces=${pieceCodes}&level=${level}`;
          Axios.get(playerOApiWithQuery);
          Axios.get(playerXApiWithQuery);
        }
        else {
          forceUpdate();
        }
      });
  });

  return (
    <RelatiGame
      {...props}
      game={game}
      onGridClick={handleGridClick} />
  );
};

export default RelatiGameBy0Player;
