import RelatiGame from "./RelatiGame";
import { RelatiGrid, HasPieceRelatiGrid } from "./types";
import { Direction } from "gridboard";

namespace RelatiGameBasicRule {
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

    export function validateIsPlayerCanDoPlacement(game: RelatiGame, grid: RelatiGrid | null, player: number) {
        const nowPlayer = game.getNowPlayer();
        const isPlayerCanNotDoPlacement = player !== nowPlayer;

        if (isPlayerCanNotDoPlacement) {
            return false;
        }

        const isGridNotExistsOrGridHasPiece = !grid || grid.piece;

        if (isGridNotExistsOrGridHasPiece) {
            return false;
        }

        return true;
    }

    export function disableAllPieces(game: RelatiGame) {
        const isAllPlayerSourcePlaced = game.getIsNotAllPlayerSourcePlaced();

        if (isAllPlayerSourcePlaced) {
            return;
        }

        for (let grid of game.board.grids) {
            if (grid.piece) {
                grid.piece.disabled = true;
            }
        }
    }

    export function enableAllPieces(game: RelatiGame) {
        const isNotAllPlayerSourcePlaced = game.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            return;
        }

        for (let sourceGrid of game.playerSourceGrids) {
            enableNearbyPiecesByGrid(sourceGrid);
        }
    }

    export function enableNearbyPiecesByGrid(grid: RelatiGrid) {
        const isGridHasNotPieceOrGridPieceNotDisabled = !grid.piece || !grid.piece.disabled;

        if (isGridHasNotPieceOrGridPieceNotDisabled) {
            return;
        }

        const sourceGrid = grid as HasPieceRelatiGrid;
        sourceGrid.piece.disabled = false;

        for (let route of RELATI_ROUTES) {
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
                enableNearbyPiecesByGrid(targetGrid);
            }
        }
    }
}

export default RelatiGameBasicRule;
