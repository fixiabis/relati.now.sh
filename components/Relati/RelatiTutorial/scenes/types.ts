import { RelatiBoardProps } from "../../RelatiBoard";
import RelatiGame from "../../../../libs/Relati";

type OmittedRelatiBoardPropKeys =
    | "board"
    | "lastPieceCoordinate"
    | "symbolOfPreviousPlayer"
    | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game: RelatiGame;
    nextStep: () => void;
}
