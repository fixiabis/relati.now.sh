import RelatiRoutes from "./RelatiRoutes";
import { Grid, GridBoard } from "gridboard";
import { RelatiPiece } from "./types";

export function isGridPlaceable(grid: Grid<RelatiPiece>, symbol: RelatiPiece["symbol"]) {
    if (grid.piece) {
        return false;
    }

    for (let route of RelatiRoutes) {
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

export function disableAllPieces(board: GridBoard<RelatiPiece>, symbol?: RelatiPiece["symbol"]) {
    for (let grid of board.grids) {
        if (grid.piece && (symbol ? grid.piece.symbol === symbol : true)) {
            grid.piece.disabled = true;
        }
    }
}

export function activePiecesBySourceGrid(grid: Grid<RelatiPiece>) {
    if (!grid?.piece?.disabled) {
        return;
    }

    grid.piece.disabled = false;

    for (let route of RelatiRoutes) {
        const [targetGrid, ...middleGrids] = route.map(direction => grid.getGridTo(direction));

        if (!targetGrid?.piece?.disabled || middleGrids.some(grid => grid?.piece)) {
            continue;
        }

        if (targetGrid.piece.symbol === grid.piece.symbol) {
            activePiecesBySourceGrid(targetGrid);
        }
    }
}
