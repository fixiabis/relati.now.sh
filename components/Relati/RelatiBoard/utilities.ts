import { GridBoard, Coordinate } from "gridboard";
import { RelatiBoard, RelatiPiece, RelatiSymbol, RelatiGameBasicRule, RelatiGrid, HasPieceRelatiGrid } from "../../../libraries/RelatiGame";

export function cloneBoard(board: RelatiBoard) {
    const clonedBoard = new GridBoard<RelatiPiece>(board.width, board.height);

    board.grids.forEach((grid, i) => {
        if (grid.piece) {
            clonedBoard.grids[i].piece = { ...grid.piece };
        }
    });

    return clonedBoard;
}

export function getTargetPathsBySourceGrid(grid: RelatiGrid, isRuleX5: boolean) {
    const sourcePaths = [];
    const { symbol } = (grid as HasPieceRelatiGrid).piece;

    for (let route of RelatiGameBasicRule.RelatiRoutes) {
        const isRouteHasMiddleGrid = route.length > 1;

        if (isRuleX5 && isRouteHasMiddleGrid) {
            continue;
        }

        const [targetGrid, ...middleGrids] = route.map(
            direction => grid.getGridTo(direction)
        ) as HasPieceRelatiGrid[];

        const isTargetGridNotExistsOrHasNotPieceOrPieceNotDisabled =
            !targetGrid?.piece || !targetGrid.piece.disabled;

        const isSomeMiddleGridsNotEmpty = middleGrids.some(grid => grid?.piece);

        const isTargetGridCanNotEnableNearbyPieces =
            isTargetGridNotExistsOrHasNotPieceOrPieceNotDisabled ||
            isSomeMiddleGridsNotEmpty;

        if (isTargetGridCanNotEnableNearbyPieces) {
            continue;
        }

        if (targetGrid.piece.symbol === symbol) {
            const sourcePath = [
                [grid.x, grid.y],
                ...route.map<Coordinate>(([x, y]) => [grid.x + x, grid.y + y]).reverse()
            ] as Coordinate[];

            sourcePaths.push(sourcePath);
        }
    }

    return sourcePaths;
}

export function disableAllPiecesByBoardAndSymbol(board: RelatiBoard, symbol: RelatiSymbol) {
    for (let { piece } of board.grids) {
        if (piece && piece.symbol === symbol) {
            piece.disabled = true;
        }
    }
}
