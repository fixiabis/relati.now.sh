import { Grid, GridBoard } from "gridboard";
import { RelatiPiece, RelatiRoutes } from "../../libs/RelatiGame";

export function activePiecesBySourceGrid(grid: Grid<RelatiPiece>) {
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
