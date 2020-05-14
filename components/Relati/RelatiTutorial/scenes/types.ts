import React from "react";
import { RelatiBoardProps } from "../../RelatiBoard";
import RelatiGame, { RelatiGrid } from "../../../../libraries/RelatiGame";
export type { Coordinate } from "gridboard";
export type { CoordinateObject } from "../../../Board";

export type { RelatiGame, RelatiGrid };

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
