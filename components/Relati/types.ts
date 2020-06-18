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

export interface RelatiTutorialComponent extends React.FunctionComponent<RelatiTutorialProps> {

}

export interface RelatiTutorialSceneProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game: RelatiGame;
    sceneDuration: number;
    toScene: (scene: string) => void;
}

export interface RelatiTutorialSceneComponent extends React.FunctionComponent<RelatiTutorialSceneProps> {
    initial(game: RelatiGame): void;
}

export interface RelatiPuzzleProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game?: RelatiGame;
    level?: string;
    onLeave?: () => void;
    onFinish?: () => void;
}

export interface RelatiPuzzleComponent extends React.FunctionComponent<RelatiPuzzleProps> {

}

export interface RelatiPuzzleLevelProps extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
    game: RelatiGame;
    toLevel: (level: string) => void;
    onFailed: (message: string) => void;
    onFinish?: () => void;
}

export interface RelatiPuzzleLevelComponent extends React.FunctionComponent<RelatiPuzzleLevelProps> {
    initial(game: RelatiGame): void;
}
