import { GridBoard, Grid } from "gridboard";

export type RelatiSymbol = "O" | "X" | "D" | "U" | "A";

export interface RelatiPiece {
    symbol: RelatiSymbol;
    primary: boolean;
    disabled: boolean;
}

export type RelatiGrid = Grid<RelatiPiece>;
export type RelatiBoard = GridBoard<RelatiPiece>;
