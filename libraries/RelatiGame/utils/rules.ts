import { RelatiGameRule, RelatiGrid, HasPieceRelatiGrid } from "../types";
import RelatiGameBasicRule from "../RelatiGameBasicRule";
import RelatiGame from "../RelatiGame";
import { RelatiSymbol } from "./index";

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

        const symbol = RelatiSymbol[player];

        for (let route of RelatiGameBasicRule.RELATI_ROUTES) {
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

        // console.warn("未找到可以連線的路徑");
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

        const symbol = RelatiSymbol[player];

        for (let route of RelatiGameBasicRule.RELATI_ROUTES) {
            const [sourceGrid, ...middleGrids] = route.map(direction => grid.getGridTo(direction)) as HasPieceRelatiGrid[];

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

        // console.warn("未找到可以連線的路徑");
        return false;
    }
};
