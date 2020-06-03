import Axios from "Axios";
import { PlayGameComponent } from "./types";
import { RelatiGame, useForceUpdate } from "../../components";
import { RelatiGamePlayer, RelatiGamePlayerX5, RelatiGamePlayerX7, RelatiGamePlayerX9, convertBoardToPieceCodes, RelatiSymbols } from "../../libraries";
import { delay } from "../../utilities";
import { useEffect } from "react";

const gameOpponentOfPlayerFromSize: Record<string, RelatiGamePlayer> = {
  "x5": RelatiGamePlayerX5,
  "x7": RelatiGamePlayerX7,
  "x9": RelatiGamePlayerX9,
};

const RelatiGameBy1Player: PlayGameComponent = ({ size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, ...props }) => {
  const forceUpdate = useForceUpdate();
  const gameOpponentOfPlayer = gameOpponentOfPlayerFromSize[size];
  const handleGridClick = () => game.getNowPlayer() !== opponentOfPlayer;

  const handleAfterGridClick = async () => {
    if (game.getNowPlayer() !== opponentOfPlayer || game.isOver) {
      return;
    }

    const pieceCodes = convertBoardToPieceCodes(game.board);
    const nowPlayer = game.getNowPlayer();
    const apiUrlWithQuery = `/api/next-step?turn=${game.turn}&pieces=${pieceCodes}&level=${level}`;

    await Axios.get(apiUrlWithQuery)
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
      });

    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();

    if (game.isOver) {
      const winnerSymbol = RelatiSymbols[game.winner] || "N";
      handleOver?.(winnerSymbol);
    }
    else {
      forceUpdate();
    }
  };

  useEffect(() => {
    if (game.turn === 0 && opponentOfPlayer === 0) {
      handleAfterGridClick();
    }
  });

  return (
    <RelatiGame
      {...props}
      game={game}
      onGridClick={handleGridClick}
      onAfterGridClick={handleAfterGridClick}
      onOver={handleOver} />
  );
};

export default RelatiGameBy1Player;
