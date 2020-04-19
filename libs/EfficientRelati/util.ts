import RelatiGrid from "./RelatiGrid";
import RelatiBoard from "./RelatiBoard";

export const enum RelatiSymbol {
    Placed = 0b0010,
    Who = 0b0001,
    O = 0b0010,
    X = 0b0011,
}

export const enum RelatiStatus {
    Primary = 0b1000,
    Actived = 0b0100,
}

function isTargetGridValid(grid: RelatiGrid | null, playerIndex: number): grid is RelatiGrid {
    return !!(grid && (grid.piece & RelatiSymbol.Who) === playerIndex);
}

function isSourceGridValid(grid: RelatiGrid | null, playerIndex: number): grid is RelatiGrid {
    return !!(grid && (grid.piece & (RelatiSymbol.Who + RelatiStatus.Actived)) === (playerIndex + RelatiStatus.Actived));
}

export function isGridHasAvailableRelatiRouteByPlayerIndex(grid: RelatiGrid, playerIndex: number) {
    let sourceGrid, middleGrid1, middleGrid2;

    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
            if (dx || dy) {
                sourceGrid = grid.getGridTo(dx, dy);

                if (isSourceGridValid(sourceGrid, playerIndex)) {
                    return true;
                }

                middleGrid1 = sourceGrid as unknown as RelatiGrid;
                sourceGrid = grid.getGridTo(dx * 2, dy * 2);

                if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece) {
                    return true;
                }
            }
        }
    }

    for (let dx = -1; dx < 2; dx++) {
        sourceGrid = grid.getGridTo(dx * 2, 1);
        middleGrid1 = grid.getGridTo(dx, 0);
        middleGrid2 = grid.getGridTo(dx * 2, 0);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = grid.getGridTo(dx * 2, -1);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid2 = grid.getGridTo(dx, -1);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = grid.getGridTo(dx * 2, 1);
        middleGrid2 = grid.getGridTo(dx, 1);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid1 = grid.getGridTo(0, 1);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = grid.getGridTo(dx * 2, -1);
        middleGrid2 = grid.getGridTo(dx, -1);
        middleGrid1 = grid.getGridTo(0, -1);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }
    }

    for (let dy = -1; dy < 2; dy++) {
        sourceGrid = grid.getGridTo(1, dy * 2);
        middleGrid1 = grid.getGridTo(0, dy);
        middleGrid2 = grid.getGridTo(0, dy * 2);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = grid.getGridTo(-1, dy * 2);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid2 = grid.getGridTo(-1, dy);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = grid.getGridTo(1, dy * 2);
        middleGrid2 = grid.getGridTo(1, dy);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid1 = grid.getGridTo(1, 0);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = grid.getGridTo(-1, dy * 2);
        middleGrid2 = grid.getGridTo(-1, dy);
        middleGrid1 = grid.getGridTo(-1, 0);

        if (isSourceGridValid(sourceGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }
    }

    return false;
}

export function disableAllPiecesByBoard(board: RelatiBoard, playerIndex: number) {
    for (let grid of board.grids) {
        if ((grid.piece & RelatiSymbol.Who) === playerIndex) {
            grid.piece &= ~RelatiStatus.Actived;
        }
    }
}

export function activePiecesByGrid(grid: RelatiGrid, playerIndex: number) {
    if (!grid.piece || grid.piece & RelatiStatus.Actived) {
        return;
    }

    let targetGrid, middleGrid1, middleGrid2;
    grid.piece += RelatiStatus.Actived;

    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
            if (dx || dy) {
                targetGrid = grid.getGridTo(dx, dy);

                if (isTargetGridValid(targetGrid, playerIndex)) {
                    activePiecesByGrid(targetGrid, playerIndex);
                }

                middleGrid1 = targetGrid;
                targetGrid = grid.getGridTo(dx * 2, dy * 2);

                if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece) {
                    activePiecesByGrid(targetGrid, playerIndex);
                }
            }
        }
    }

    for (let dx = -1; dx < 2; dx++) {
        targetGrid = grid.getGridTo(dx * 2, 1);
        middleGrid1 = grid.getGridTo(dx, 0);
        middleGrid2 = grid.getGridTo(dx * 2, 0);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        targetGrid = grid.getGridTo(dx * 2, -1);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        middleGrid2 = grid.getGridTo(dx, -1);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        targetGrid = grid.getGridTo(dx * 2, 1);
        middleGrid2 = grid.getGridTo(dx, 1);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        middleGrid1 = grid.getGridTo(0, 1);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        targetGrid = grid.getGridTo(dx * 2, -1);
        middleGrid2 = grid.getGridTo(dx, -1);
        middleGrid1 = grid.getGridTo(0, -1);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }
    }

    for (let dy = -1; dy < 2; dy++) {
        targetGrid = grid.getGridTo(1, dy * 2);
        middleGrid1 = grid.getGridTo(0, dy);
        middleGrid2 = grid.getGridTo(0, dy * 2);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        targetGrid = grid.getGridTo(-1, dy * 2);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        middleGrid2 = grid.getGridTo(-1, dy);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        targetGrid = grid.getGridTo(1, dy * 2);
        middleGrid2 = grid.getGridTo(1, dy);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        middleGrid1 = grid.getGridTo(1, 0);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }

        targetGrid = grid.getGridTo(-1, dy * 2);
        middleGrid2 = grid.getGridTo(-1, dy);
        middleGrid1 = grid.getGridTo(-1, 0);

        if (isTargetGridValid(targetGrid, playerIndex) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid, playerIndex);
        }
    }
}
