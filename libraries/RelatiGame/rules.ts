import RelatiGame from "./RelatiGame";
import RelatiGameBasicRule from "./RelatiGameBasicRule";
import { RelatiGameRule, RelatiGrid, HasPieceRelatiGrid } from "./types";
import { RelatiSymbols } from "./utilities";

export const RelatiGameRuleX5: RelatiGameRule = {
    boardWidth: 5,
    boardHeight: 5,
    disableAllPieces: () => { },
    enableAllPieces: () => { },

    validateIsPlayerCanDoPlacement(game: RelatiGame, grid: RelatiGrid, player: number) {
        const isNotAllPlayerSourcePlaced = game.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            return true;
        }

        const symbol = RelatiSymbols[player];

        for (let route of RelatiGameBasicRule.RelatiRoutes) {
            const isRouteHasMiddleGrid = route.length > 1;

            if (isRouteHasMiddleGrid) {
                continue;
            }

            const [direction] = route;
            const sourceGrid = grid.getGridTo(direction) as HasPieceRelatiGrid;
            const isSourceGridNotExistsOrHasNotPiece = !sourceGrid?.piece;

            if (isSourceGridNotExistsOrHasNotPiece) {
                continue;
            }

            if (sourceGrid.piece.symbol === symbol) {
                return true;
            }
        }

        return false;
    }
};

function enableNearbyPiecesAsX7ByGrid(grid: RelatiGrid) {
    const isGridHasNotPieceOrGridPieceNotDisabled = !grid?.piece?.disabled;

    if (isGridHasNotPieceOrGridPieceNotDisabled) {
        return;
    }

    const sourceGrid = grid as HasPieceRelatiGrid;
    sourceGrid.piece.disabled = false;

    for (let route of RelatiGameBasicRule.RelatiRoutes) {
        const isRouteHas2MiddleGrids = route.length > 2;

        if (isRouteHas2MiddleGrids) {
            continue;
        }

        const [targetGrid, ...middleGrids] = route.map(
            direction => grid.getGridTo(direction)
        ) as HasPieceRelatiGrid[];

        const isTargetGridNotExistsOrHasNotPieceOrPieceNotDisabled =
            !targetGrid?.piece?.disabled;

        const isSomeMiddleGridsNotEmpty = middleGrids.some(grid => grid?.piece);

        const isTargetGridCanNotEnableNearbyPieces =
            isTargetGridNotExistsOrHasNotPieceOrPieceNotDisabled ||
            isSomeMiddleGridsNotEmpty;

        if (isTargetGridCanNotEnableNearbyPieces) {
            continue;
        }

        if (targetGrid.piece.symbol === sourceGrid.piece.symbol) {
            enableNearbyPiecesAsX7ByGrid(targetGrid);
        }
    }
}

export const RelatiGameRuleX7: RelatiGameRule = {
    boardWidth: 7,
    boardHeight: 7,
    disableAllPieces: RelatiGameBasicRule.disableAllPieces,
    enableAllPieces(game: RelatiGame) {
        const isNotAllPlayerSourcePlaced = game.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            return;
        }

        for (let sourceGrid of game.playerSourceGrids) {
            enableNearbyPiecesAsX7ByGrid(sourceGrid);
        }
    },

    validateIsPlayerCanDoPlacement(game: RelatiGame, grid: RelatiGrid, player: number) {
        const isNotAllPlayerSourcePlaced = game.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            return true;
        }

        const symbol = RelatiSymbols[player];

        for (let route of RelatiGameBasicRule.RelatiRoutes) {
            const isRouteHas2MiddleGrids = route.length > 2;

            if (isRouteHas2MiddleGrids) {
                continue;
            }

            const [sourceGrid, ...middleGrids] = route.map(
                direction => grid.getGridTo(direction)
            ) as HasPieceRelatiGrid[];

            const isSourceGridNotExistsOrHasNotPieceOrPieceDisabled =
                !sourceGrid?.piece || sourceGrid.piece.disabled;

            const isSomeMiddleGridsNotEmpty = middleGrids.some(grid => grid?.piece);

            const isSourceGridCanNotEnableNearbyPieces =
                isSourceGridNotExistsOrHasNotPieceOrPieceDisabled ||
                isSomeMiddleGridsNotEmpty;

            if (isSourceGridCanNotEnableNearbyPieces) {
                continue;
            }

            if (sourceGrid.piece.symbol === symbol) {
                return true;
            }
        }

        return false;
    }
};

export const RelatiGameRuleX9: RelatiGameRule = {
    boardWidth: 9,
    boardHeight: 9,
    disableAllPieces: RelatiGameBasicRule.disableAllPieces,
    enableAllPieces: RelatiGameBasicRule.enableAllPieces,

    validateIsPlayerCanDoPlacement(game: RelatiGame, grid: RelatiGrid, player: number) {
        const isNotAllPlayerSourcePlaced = game.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            return true;
        }

        const symbol = RelatiSymbols[player];

        for (let route of RelatiGameBasicRule.RelatiRoutes) {
            const [sourceGrid, ...middleGrids] = route.map(
                direction => grid.getGridTo(direction)
            ) as HasPieceRelatiGrid[];

            const isSourceGridNotExistsOrHasNotPieceOrPieceDisabled =
                !sourceGrid?.piece || sourceGrid.piece.disabled;

            const isSomeMiddleGridsNotEmpty = middleGrids.some(grid => grid?.piece);

            const isSourceGridCanNotEnableNearbyPieces =
                isSourceGridNotExistsOrHasNotPieceOrPieceDisabled ||
                isSomeMiddleGridsNotEmpty;

            if (isSourceGridCanNotEnableNearbyPieces) {
                continue;
            }

            if (sourceGrid.piece.symbol === symbol) {
                return true;
            }
        }

        return false;
    }
};
