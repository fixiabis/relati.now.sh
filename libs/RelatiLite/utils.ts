import { RelatiGrid, RelatiBoard, RelatiSymbol } from "./types";
import { Direction } from "gridboard";

export const RELATI_SYMBOLS: RelatiSymbol[] = ["O", "X", "D", "U", "A"];

export const RELATI_DIRECTIONS = [
    Direction`F`,
    Direction`B`,
    Direction`L`,
    Direction`R`,

    Direction`FL`,
    Direction`FR`,
    Direction`BL`,
    Direction`BR`,
];

export function isGridHasAvailableRelatiRouteBySymbol(grid: RelatiGrid, symbol: RelatiSymbol) {
    for (let direction of RELATI_DIRECTIONS) {
        const sourceGrid = grid.getGridTo(direction);

        if (!sourceGrid?.piece || sourceGrid.piece.disabled) {
            continue;
        }

        if (sourceGrid.piece.symbol === symbol) {
            return true;
        }
    }

    return false;
}

export function disableAllPiecesByBoard(board: RelatiBoard, symbol?: RelatiSymbol) {
    for (let { piece } of board.grids) {
        if (piece && (!symbol || piece.symbol === symbol)) {
            piece.disabled = true;
        }
    }
}

export function activePiecesByGrid(grid: RelatiGrid) {
    if (!grid?.piece?.disabled) {
        return;
    }

    grid.piece.disabled = false;

    for (let direction of RELATI_DIRECTIONS) {
        const targetGrid = grid.getGridTo(direction);

        if (!targetGrid?.piece?.disabled) {
            continue;
        }

        if (targetGrid.piece.symbol === grid.piece.symbol) {
            activePiecesByGrid(targetGrid);
        }
    }
}
