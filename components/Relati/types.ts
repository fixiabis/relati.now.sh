import React from "react";
import { RelatiGame } from "../../libraries";
import { Props as RelatiBoardProps } from "./RelatiBoard";

type OmittedRelatiBoardPropKeys =
    | "game"
    | "lastPieceCoordinate"
    | "symbolOfPreviousPlayer"
    | "symbolOfCurrentPlayer";

export interface RelatiTutorialProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game?: RelatiGame;
    scene?: string;
    sceneDuration: number;
    onFinish?: () => void;
}

export type RelatiTutorialComponent<Super = React.FunctionComponent<RelatiTutorialProps>> = Super & {

};

export interface SceneProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game: RelatiGame;
    sceneDuration: number;
    toScene: (scene: string) => void;
}

export type SceneComponent<Super = React.FunctionComponent<SceneProps>> = Super & {
    initial(game: RelatiGame): void;
};
