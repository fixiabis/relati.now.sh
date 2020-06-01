import { PlayGameComponent } from "./types";
import { RelatiGame } from "../../components";

const RelatiGameBy2Player: PlayGameComponent = ({ size, opponentOfPlayer, playerOApi, playerXApi, rounds, level, game, onOver: handleOver, ...props }) => {
  return (
    <RelatiGame
      {...props}
      game={game}
      onOver={handleOver} />
  );
};

export default RelatiGameBy2Player;
