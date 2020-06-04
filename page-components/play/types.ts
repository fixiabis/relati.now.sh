import { RelatiGameProps } from "../../components";
import { RelatiGame } from "../../libraries";

type OmittedGamePropKeys = "";

export interface PlayGameProps extends Omit<RelatiGameProps, OmittedGamePropKeys> {
    type: string;
    roundId?: string;
    game: RelatiGame;
    level: number;
    rounds: number;
    playerOApi?: string;
    playerXApi?: string;
    opponentOfPlayer: number;
}

export type PlayGameComponent<Super = React.FunctionComponent<PlayGameProps>> = Super & {

};
