import React from "react";
import { RelatiBoardProps } from "../../RelatiBoard";
import RelatiGame, { RelatiGrid } from "../../../../libs/Relati";

type OmittedRelatiBoardPropKeys =
    | "board"
    | "lastPieceCoordinate"
    | "symbolOfPreviousPlayer"
    | "symbolOfCurrentPlayer";

export interface SceneProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game: RelatiGame;
    toStep: (step: string) => void;
}

export type SceneComponent<Super = React.FunctionComponent<SceneProps>> = Super & {
    initial(game: RelatiGame): void;
};

export interface PlacementSceneComponentConfig extends Pick<RelatiBoardProps, "children"> {
    nextStep: string;
    gameTurn: number;
    initialDescription: string;
    initial(game: RelatiGame): void;
    exceptedGridIndexes: number[];
    onTurnToComputer: (game: RelatiGame) => string | void;
    onPlayerPlacedSymbol: (grid: RelatiGrid) => string | void;
}
