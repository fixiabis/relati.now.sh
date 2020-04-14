import { RelatiGrid, RelatiBoard, RelatiSymbol } from "./types";
import { Direction } from "gridboard";

export const RELATI_SYMBOLS: RelatiSymbol[] = ["O", "X", "D", "U", "A"];

export const RELATI_ROUTES = [
    [Direction`F`],
    [Direction`B`],
    [Direction`L`],
    [Direction`R`],

    [Direction`FL`],
    [Direction`FR`],
    [Direction`BL`],
    [Direction`BR`],

    [Direction`FF`, Direction`F`],
    [Direction`BB`, Direction`B`],
    [Direction`LL`, Direction`L`],
    [Direction`RR`, Direction`R`],

    [Direction`FFLL`, Direction`FL`],
    [Direction`FFRR`, Direction`FR`],
    [Direction`BBLL`, Direction`BL`],
    [Direction`BBRR`, Direction`BR`],

    [Direction`FFL`, Direction`FF`, Direction`F`],
    [Direction`FFR`, Direction`FF`, Direction`F`],
    [Direction`BBL`, Direction`BB`, Direction`B`],
    [Direction`BBR`, Direction`BB`, Direction`B`],

    [Direction`FFL`, Direction`FL`, Direction`F`],
    [Direction`FFR`, Direction`FR`, Direction`F`],
    [Direction`BBL`, Direction`BL`, Direction`B`],
    [Direction`BBR`, Direction`BR`, Direction`B`],

    [Direction`FFL`, Direction`FL`, Direction`L`],
    [Direction`FFR`, Direction`FR`, Direction`R`],
    [Direction`BBL`, Direction`BL`, Direction`L`],
    [Direction`BBR`, Direction`BR`, Direction`R`],

    [Direction`FLL`, Direction`FL`, Direction`F`],
    [Direction`FRR`, Direction`FR`, Direction`F`],
    [Direction`BLL`, Direction`BL`, Direction`B`],
    [Direction`BRR`, Direction`BR`, Direction`B`],

    [Direction`FLL`, Direction`FL`, Direction`L`],
    [Direction`FRR`, Direction`FR`, Direction`R`],
    [Direction`BLL`, Direction`BL`, Direction`L`],
    [Direction`BRR`, Direction`BR`, Direction`R`],

    [Direction`FLL`, Direction`LL`, Direction`L`],
    [Direction`FRR`, Direction`RR`, Direction`R`],
    [Direction`BLL`, Direction`LL`, Direction`L`],
    [Direction`BRR`, Direction`RR`, Direction`R`],
];

export function isGridHasAvailableRelatiRouteBySymbol(grid: RelatiGrid, symbol: RelatiSymbol) {
    for (let route of RELATI_ROUTES) {
        const [sourceGrid, ...middleGrids] = route.map(direction => grid.getGridTo(direction));

        if (!sourceGrid?.piece || sourceGrid.piece.disabled || middleGrids.some(grid => grid?.piece)) {
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

    for (let route of RELATI_ROUTES) {
        const [targetGrid, ...middleGrids] = route.map(direction => grid.getGridTo(direction));

        if (!targetGrid?.piece?.disabled || middleGrids.some(grid => grid?.piece)) {
            continue;
        }

        if (targetGrid.piece.symbol === grid.piece.symbol) {
            activePiecesByGrid(targetGrid);
        }
    }
}
