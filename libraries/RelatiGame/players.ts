import RelatiGame from "./RelatiGame";
import { Direction } from "gridboard";
import { RelatiPiece } from "./types";

const nearbyDirections = ["F", "B", "L", "R", "FL", "FR", "BL", "BR"].map(Direction);

function evaluateByGameAndPlayer(game: RelatiGame, player: number) {
    const playerOPointFromGridIndexes = new Int8Array(game.board.grids.length);
    const playerXPointFromGridIndexes = new Int8Array(game.board.grids.length);

    for (let grid of game.board.grids) {
        if (!grid.piece) {
            playerOPointFromGridIndexes[grid.i] = -1;
            playerXPointFromGridIndexes[grid.i] = -1;
            continue;
        }

        playerOPointFromGridIndexes[grid.i] = 0;
        playerXPointFromGridIndexes[grid.i] = 0;
    }

    let isAllGridExplored: boolean = true;

    do {
        isAllGridExplored = true;

        for (let grid of game.board.grids) {
            const isGridHasNotPlayerOPoint = playerOPointFromGridIndexes[grid.i] === -1;
            const isGridHasNotPlayerXPoint = playerXPointFromGridIndexes[grid.i] === -1;
            const isGridHasPointButPieceNotO = playerOPointFromGridIndexes[grid.i] === 0 && (grid.piece as RelatiPiece).symbol !== "O";
            const isGridHasPointButPieceNotX = playerXPointFromGridIndexes[grid.i] === 0 && (grid.piece as RelatiPiece).symbol !== "X";

            evaluateGridPlayerOPoint: {
                if (isGridHasNotPlayerOPoint || isGridHasPointButPieceNotO) {
                    break evaluateGridPlayerOPoint;
                }

                for (let nearbyDirection of nearbyDirections) {
                    const nearbyGrid = grid.getGridTo(nearbyDirection);

                    if (!nearbyGrid) {
                        continue;
                    }

                    const isNearbyGridHasPoint = playerOPointFromGridIndexes[nearbyGrid.i] !== -1;

                    const isGridPointLessThanNearbyGridReferPoint =
                        playerOPointFromGridIndexes[grid.i] <
                        playerOPointFromGridIndexes[nearbyGrid.i] - 1;

                    if (!isNearbyGridHasPoint || isGridPointLessThanNearbyGridReferPoint) {
                        playerOPointFromGridIndexes[nearbyGrid.i] = playerOPointFromGridIndexes[grid.i] + 1;
                        isAllGridExplored = false;
                    }
                }
            }

            evaluateGridPlayerXPoint: {
                if (isGridHasNotPlayerXPoint || isGridHasPointButPieceNotX) {
                    break evaluateGridPlayerXPoint;
                }

                for (let nearbyDirection of nearbyDirections) {
                    const nearbyGrid = grid.getGridTo(nearbyDirection);

                    if (!nearbyGrid) {
                        continue;
                    }

                    const isNearbyGridHasPoint = playerXPointFromGridIndexes[nearbyGrid.i] !== -1;

                    const isGridPointLessThanNearbyGridReferPoint =
                        playerXPointFromGridIndexes[grid.i] <
                        playerXPointFromGridIndexes[nearbyGrid.i] - 1;

                    if (!isNearbyGridHasPoint || isGridPointLessThanNearbyGridReferPoint) {
                        playerXPointFromGridIndexes[nearbyGrid.i] = playerXPointFromGridIndexes[grid.i] + 1;
                        isAllGridExplored = false;
                    }
                }
            }
        }
    } while (!isAllGridExplored);

    if (player === 0) {
        return (
            playerOPointFromGridIndexes.reduce(
                (r, v) => r + (v && 25 - v), 0
            ) -
            playerXPointFromGridIndexes.reduce(
                (r, v) => r + (v && 25 - v), 0
            )
        );
    }
    else {
        return (
            playerXPointFromGridIndexes.reduce(
                (r, v) => r + (v && 25 - v), 0
            ) -
            playerOPointFromGridIndexes.reduce(
                (r, v) => r + (v && 25 - v), 0
            )
        );
    }
}

function evaluateUseDeepThinkingByGameAndPlayerAndDepth(
    game: RelatiGame,
    player: number,
    depth: number,
    nowPlayer: number = player,
    alpha: number = -Infinity,
    beta: number = +Infinity
) {
    
}

DEBUG: Object.assign(globalThis, { EVALUATE: evaluateByGameAndPlayer });

export const RelatiGamePlayerX5 = {
    doPlacementByGameAndPlayer(game: RelatiGame, player: number) {
        
    }
};
