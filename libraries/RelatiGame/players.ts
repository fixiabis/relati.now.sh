import RelatiGame from "./RelatiGame";
import { Direction } from "gridboard";
import { RelatiPiece } from "./types";
import RelatiGameBasicRule from "./RelatiGameBasicRule";

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

    // console.log(playerOPointFromGridIndexes, playerXPointFromGridIndexes);

    if (player === 0) {
        return playerOPointFromGridIndexes.reduce((r, v, i) => {
            if (v === 0) {
                return r;
            }
            else if (v === -1) {
                return r - 25;
            }
            else if (playerXPointFromGridIndexes[i] === -1) {
                return r + 25;
            }
            else {
                return r + ((25 - v) - (25 - playerXPointFromGridIndexes[i]));
            }
        }, 0);
    }
    else {
        return playerXPointFromGridIndexes.reduce((r, v, i) => {
            if (v === 0) {
                return r;
            }
            else if (v === -1) {
                return r - 25;
            }
            else if (playerOPointFromGridIndexes[i] === -1) {
                return r + 25;
            }
            else {
                return r + ((25 - v) - (25 - playerOPointFromGridIndexes[i]));
            }
        }, 0);
    }
}

function evaluateUseDeepThinkingByGameAndPlayerAndDepth(
    game: RelatiGame,
    player: number,
    depth: number = 0,
    nowPlayer: number = player,
    alpha: number = -Infinity,
    beta: number = +Infinity,
) {
    if (depth === 0) {
        const point = evaluateByGameAndPlayer(game, player);
        // printBoardContent(game.board);
        // console.log(nowPlayer, point);
        return point;
    }

    if (player === nowPlayer) {
        let point = -Infinity;

        for (let grid of game.board.grids) {
            const isGridPlaceable =
                RelatiGameBasicRule.validateIsPlayerCanDoPlacement(game, grid, nowPlayer) &&
                game.rule.validateIsPlayerCanDoPlacement(game, grid, nowPlayer);

            if (!isGridPlaceable) {
                continue;
            }

            // console.group("alpha", grid);
            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, nowPlayer);

            // const previousPoint = point;

            point = Math.max(point, evaluateUseDeepThinkingByGameAndPlayerAndDepth(
                game,
                player,
                depth - 1,
                nowPlayer ? 0 : 1,
                alpha,
                beta,
            ));

            // if (previousPoint !== -105 && point === -105) {
            //     printBoardContent(game.board);
            // }

            game.undo();
            alpha = Math.max(alpha, point);
            // console.groupEnd();
            // console.log(point);

            if (beta <= alpha) {
                break;
            }
        }

        return point;
    }
    else {
        let point = Infinity;

        for (let grid of game.board.grids) {
            const isGridPlaceable =
                RelatiGameBasicRule.validateIsPlayerCanDoPlacement(game, grid, nowPlayer) &&
                game.rule.validateIsPlayerCanDoPlacement(game, grid, nowPlayer);

            if (!isGridPlaceable) {
                continue;
            }

            // console.group("beta", grid);
            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, nowPlayer);

            point = Math.min(point, evaluateUseDeepThinkingByGameAndPlayerAndDepth(
                game,
                player,
                depth - 1,
                nowPlayer ? 0 : 1,
                alpha,
                beta,
            ));

            game.undo();
            beta = Math.min(beta, point);
            // console.groupEnd();
            // console.log(point);

            if (beta <= alpha) {
                break;
            }
        }

        return point;
    }
}

export const RelatiGamePlayerX5 = {
    doPlacementByGameAndPlayer(game: RelatiGame, player: number, level: number) {
        const gridIndexWithPoints: [number, number][] = [];

        console.log(`turn: ${game.turn}`);

        for (let grid of game.board.grids) {
            const isGridPlaceable =
                RelatiGameBasicRule.validateIsPlayerCanDoPlacement(game, grid, player) &&
                game.rule.validateIsPlayerCanDoPlacement(game, grid, player);

            if (!isGridPlaceable) {
                continue;
            }

            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, player);

            const point = evaluateUseDeepThinkingByGameAndPlayerAndDepth(game, player, level, player ? 0 : 1);
            gridIndexWithPoints.push([grid.i, point]);

            console.log(`coord: (${grid.x}, ${grid.y}) = ${point}`);
            game.undo();
        }

        gridIndexWithPoints.sort(([, pointA], [, pointB]) => pointA > pointB ? -1 : 1);

        if (gridIndexWithPoints[0]) {
            const grid = game.board.grids[gridIndexWithPoints[0][0]];
            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, player);
        }
    }
};

function printPointContent(points: Int8Array) {
    let boardContent = "";

    for (let y = 0; y < 5; y++) {
        boardContent += "|";

        for (let x = 0; x < 5; x++) {
            let pointText = points[y * 5 + x].toString();
            pointText = " ".repeat(3 - pointText.length) + pointText;
            boardContent += pointText;
            boardContent += "|";
        }

        boardContent += "\n";
    }

    console.log(boardContent);
}

function printBoardContent(board: RelatiGame["board"]) {
    let boardContent = "";

    for (let y = 0; y < board.height; y++) {
        boardContent += "|";

        for (let x = 0; x < board.width; x++) {
            boardContent += " ";
            boardContent += board.getGridAt(x, y)?.piece?.symbol || " ";
            boardContent += " |";
        }

        boardContent += "\n";
    }

    console.log(boardContent);
}

DEBUG: Object.assign(globalThis, {
    EVALUATE: evaluateByGameAndPlayer,
    DEEP_EVALUATE: evaluateUseDeepThinkingByGameAndPlayerAndDepth,
    PLAYER: RelatiGamePlayerX5,
});
