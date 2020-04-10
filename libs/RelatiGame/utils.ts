import RelatiRoutes from "./RelatiRoutes";
import { Grid, GridBoard } from "gridboard";
import { Piece } from "./types";

export function isGridPlaceable(grid: Grid<Piece>, symbol: Piece["symbol"]) {
    if (grid.piece) {
        return false;
    }

    for (let routes of RelatiRoutes) {
        const [sourceCoordinate, ...middleCoordinates] = routes;
        const sourceGrid = grid.getGridTo(sourceCoordinate);
        const middleGrids = middleCoordinates.map(middle => grid.getGridTo(middle));

        if (!sourceGrid?.piece || sourceGrid.piece.disabled || middleGrids.some(grid => grid.piece)) {
            continue;
        }

        if (sourceGrid.piece.symbol === symbol) {
            return true;
        }
    }

    return false;
}

export function disableAllPiecesWithoutPrimarySymbol(board: GridBoard<Piece>) {
    for (let grid of board.grids) {
        if (grid.piece && !grid.piece.primary) {
            grid.piece.disabled = true;
        }
    }
}

export function activePiecesBySourceGrid(grid: Grid<Piece>) {
    for (let routes of RelatiRoutes) {
        const [targetCoordinate, ...middleCoordinates] = routes;
        const targetGrid = grid.getGridTo(targetCoordinate);
        const middleGrids = middleCoordinates.map(middle => grid.getGridTo(middle));

        if (!targetGrid?.piece?.disabled || middleGrids.some(grid => grid.piece)) {
            continue;
        }

        if (targetGrid.piece.symbol === grid.piece.symbol) {
            targetGrid.piece.disabled = false;
            activePiecesBySourceGrid(targetGrid);
        }
    }
}
