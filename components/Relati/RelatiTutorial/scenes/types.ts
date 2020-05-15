import React from "react";
import { RelatiBoardProps } from "../../RelatiBoard";
import RelatiGame from "../../../../libraries/RelatiGame";
export type { Coordinate } from "gridboard";
export type { CoordinateObject } from "../../../Board";
export type { RelatiGame };
export type { RelatiGrid, HasPieceRelatiGrid } from "../../../../libraries/RelatiGame";

type OmittedRelatiBoardPropKeys =
    | "game"
    | "lastPieceCoordinate"
    | "symbolOfPreviousPlayer"
    | "symbolOfCurrentPlayer";

export interface SceneProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game: RelatiGame;
    toScene: (scene: string) => void;
}

export type SceneComponent<Super = React.FunctionComponent<SceneProps>> = Super & {
    initial(game: RelatiGame): void;
};
