import React from "react";
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

export type Component<Super = React.FunctionComponent<Props>> = Super & {
    initial?(game: RelatiGame): void;
};
