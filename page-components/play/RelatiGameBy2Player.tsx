import { PlayGameComponent } from "./types";
import { RelatiGame } from "../../components";

const RelatiGameBy2Player: PlayGameComponent = ({ type: size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, roundId, ...props }) => {
  return (
    <RelatiGame
      {...props}
      game={game}
      onOver={handleOver} />
  );
};

export default RelatiGameBy2Player;
