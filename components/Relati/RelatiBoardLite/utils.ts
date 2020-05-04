import { Grid, Coordinate, GridBoard } from "gridboard";
import { RELATI_DIRECTIONS } from "../../../libs/RelatiLite";
import { RelatiPiece, RelatiBoard } from "../../../libs/Relati";

export function getTargetPathsBySourceGridAsLite(grid: Grid<RelatiPiece>) {
    const sourcePaths = [];

    for (let direction of RELATI_DIRECTIONS) {
        const targetGrid = grid.getGridTo(direction);

        if (!targetGrid?.piece?.disabled) {
            continue;
        }

        const sourcePath = [
            [grid.x, grid.y],
            [targetGrid.x, targetGrid.y],
        ] as Coordinate[];

        if (targetGrid.piece.symbol === grid?.piece?.symbol) {
            sourcePaths.push(sourcePath);
        }
    }

    return sourcePaths;
}

export const cloneBoard = (board: RelatiBoard) => {
    const clonedBoard = new GridBoard<RelatiPiece>(board.width, board.height);

    board.grids.forEach((grid, i) => {
        if (grid.piece) {
            clonedBoard.grids[i].piece = { ...grid.piece };
        }
    });

    return clonedBoard;
};
