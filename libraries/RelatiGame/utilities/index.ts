import { RelatiSymbol, RelatiBoard, RelatiPiece } from "../types";
export { default as TurnBasedGame } from "./TurnBasedGame";
export const RelatiSymbols: RelatiSymbol[] = ["O", "X", "D", "U", "A"];

export const convertBoardToPieceCodes = (board: RelatiBoard) => {
    return board.grids.map(grid => getCodeByPiece(grid.piece)).join("");
};

export function getCodeByPiece(piece: RelatiPiece | undefined) {
    if (!piece) {
        return "0";
    }
    else if (piece.symbol === "O") {
        if (piece.primary) {
            return "1";
        }
        else if (piece.disabled) {
            return "5";
        }
        else {
            return "3";
        }
    }
    else if (piece.symbol === "X") {
        if (piece.primary) {
            return "2";
        }
        else if (piece.disabled) {
            return "6";
        }
        else {
            return "4";
        }
    }
}

export function createPieceByCode(code: string): RelatiPiece | undefined {
    switch (code) {
        case "1": return { symbol: "O", primary: true, disabled: false };
        case "2": return { symbol: "X", primary: true, disabled: false };
        case "3": return { symbol: "O", primary: false, disabled: false };
        case "4": return { symbol: "X", primary: false, disabled: false };
        case "5": return { symbol: "O", primary: false, disabled: true };
        case "6": return { symbol: "X", primary: false, disabled: true };
    }
}
