import { Grid, Coordinate } from "gridboard";
import { RelatiPiece, RelatiRoutes } from "../../libs/RelatiGame";

export function getTargetPathsBySourceGrid(grid: Grid<RelatiPiece>) {
    const sourcePaths = [];

    for (let route of RelatiRoutes) {
        const [targetGrid, ...middleGrids] = route.map(direction => grid.getGridTo(direction));

        if (!targetGrid?.piece?.disabled || middleGrids.some(grid => grid?.piece)) {
            continue;
        }

        const sourcePath = [
            [grid.x, grid.y],
            ...route.map<Coordinate>(([x, y]) => [grid.x + x, grid.y + y]).reverse()
        ] as Coordinate[];

        if (targetGrid.piece.symbol === grid?.piece?.symbol) {
            sourcePaths.push(sourcePath);
        }
    }

    return sourcePaths;
}
