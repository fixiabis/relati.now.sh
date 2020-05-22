import { Grid, GridBoard } from "gridboard";
import RelatiGame from "./RelatiGame";

export type RelatiSymbol = "O" | "X" | "D" | "U" | "A";

export interface RelatiPiece {
    symbol: RelatiSymbol;
    primary: boolean;
    disabled: boolean;
}

export type RelatiGrid = Grid<RelatiPiece>;
export type RelatiBoard = GridBoard<RelatiPiece>;
export type HasPieceRelatiGrid = Required<RelatiGrid>;

export interface RelatiGameRule {
    boardWidth: number;
    boardHeight: number;
    validateIsPlayerCanDoPlacement(game: RelatiGame, grid: RelatiGrid, player: number): boolean;
    disableAllPieces(game: RelatiGame): void;
    enableAllPieces(game: RelatiGame): void;
}

export interface RelatiGamePlayer {
    getGridIndexForPlacementByGameAndPlayer(game: RelatiGame, player: number, level: number): number;
    doPlacementByGameAndPlayer(game: RelatiGame, player: number, level: number): void;
}
