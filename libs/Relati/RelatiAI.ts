import RelatiGame from "./RelatiGame";
import { RelatiGrid, RelatiSymbol, RelatiBoard } from "./types";

function getGridAt(board: RelatiBoard, x: number, y: number) {
    if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
        return null;
    }

    const i = y * board.width + x;
    return board.grids[i];
}

function getGridTo(grid: RelatiGrid, dx: number, dy: number) {
    return getGridAt(grid.board, grid.x + dx, grid.y + dy);
}

function isSourceGridValid(sourceGrid: RelatiGrid | null, symbol: RelatiSymbol) {
    return sourceGrid?.piece && sourceGrid.piece.symbol === symbol && !sourceGrid.piece.disabled;
}

function isTargetGridValid(targetGrid: RelatiGrid | null, symbol: RelatiSymbol): targetGrid is RelatiGrid {
    return !!(targetGrid?.piece && targetGrid.piece.symbol === symbol);
}

function isGridHasAvailableRelatiRouteBySymbol(grid: RelatiGrid, symbol: RelatiSymbol) {
    let sourceGrid, middleGrid1, middleGrid2;

    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
            if (dx || dy) {
                sourceGrid = getGridTo(grid, dx, dy);

                if (isSourceGridValid(sourceGrid, symbol)) {
                    return true;
                }

                middleGrid1 = sourceGrid;
                sourceGrid = getGridTo(grid, dx * 2, dy * 2);

                if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece) {
                    return true;
                }
            }
        }
    }

    for (let dx = -1; dx < 2; dx += 2) {
        sourceGrid = getGridTo(grid, dx * 2, 1);
        middleGrid1 = getGridTo(grid, dx, 0);
        middleGrid2 = getGridTo(grid, dx * 2, 0);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = getGridTo(grid, dx * 2, -1);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid2 = getGridTo(grid, dx, -1);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = getGridTo(grid, dx * 2, 1);
        middleGrid2 = getGridTo(grid, dx, 1);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid1 = getGridTo(grid, 0, 1);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = getGridTo(grid, dx * 2, -1);
        middleGrid2 = getGridTo(grid, dx, -1);
        middleGrid1 = getGridTo(grid, 0, -1);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }
    }

    for (let dy = -1; dy < 2; dy += 2) {
        sourceGrid = getGridTo(grid, 1, dy * 2);
        middleGrid1 = getGridTo(grid, 0, dy);
        middleGrid2 = getGridTo(grid, 0, dy * 2);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = getGridTo(grid, -1, dy * 2);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid2 = getGridTo(grid, -1, dy);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = getGridTo(grid, 1, dy * 2);
        middleGrid2 = getGridTo(grid, 1, dy);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        middleGrid1 = getGridTo(grid, 1, 0);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }

        sourceGrid = getGridTo(grid, -1, dy * 2);
        middleGrid2 = getGridTo(grid, -1, dy);
        middleGrid1 = getGridTo(grid, -1, 0);

        if (isSourceGridValid(sourceGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            return true;
        }
    }

    return false;
}

function disableAllPiecesByBoard(board: RelatiBoard, symbol: RelatiSymbol) {
    for (let { piece } of board.grids) {
        if (piece && piece.symbol === symbol) {
            piece.disabled = true;
        }
    }
}

function activePiecesByGrid(grid: RelatiGrid) {
    if (!grid?.piece?.disabled) {
        return;
    }

    grid.piece.disabled = false;
    const symbol = grid.piece.symbol;
    let targetGrid, middleGrid1, middleGrid2;

    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
            if (dx || dy) {
                targetGrid = getGridTo(grid, dx, dy);

                if (isTargetGridValid(targetGrid, symbol)) {
                    activePiecesByGrid(targetGrid);
                }

                middleGrid1 = targetGrid;
                targetGrid = getGridTo(grid, dx * 2, dy * 2);

                if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece) {
                    activePiecesByGrid(targetGrid);
                }
            }
        }
    }

    for (let dx = -1; dx < 2; dx += 2) {
        targetGrid = getGridTo(grid, dx * 2, 1);
        middleGrid1 = getGridTo(grid, dx, 0);
        middleGrid2 = getGridTo(grid, dx * 2, 0);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        targetGrid = getGridTo(grid, dx * 2, -1);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        middleGrid2 = getGridTo(grid, dx, -1);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        targetGrid = getGridTo(grid, dx * 2, 1);
        middleGrid2 = getGridTo(grid, dx, 1);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        middleGrid1 = getGridTo(grid, 0, 1);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        targetGrid = getGridTo(grid, dx * 2, -1);
        middleGrid2 = getGridTo(grid, dx, -1);
        middleGrid1 = getGridTo(grid, 0, -1);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }
    }

    for (let dy = -1; dy < 2; dy += 2) {
        targetGrid = getGridTo(grid, 1, dy * 2);
        middleGrid1 = getGridTo(grid, 0, dy);
        middleGrid2 = getGridTo(grid, 0, dy * 2);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        targetGrid = getGridTo(grid, -1, dy * 2);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        middleGrid2 = getGridTo(grid, -1, dy);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        targetGrid = getGridTo(grid, 1, dy * 2);
        middleGrid2 = getGridTo(grid, 1, dy);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        middleGrid1 = getGridTo(grid, 1, 0);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }

        targetGrid = getGridTo(grid, -1, dy * 2);
        middleGrid2 = getGridTo(grid, -1, dy);
        middleGrid1 = getGridTo(grid, -1, 0);

        if (isTargetGridValid(targetGrid, symbol) && !middleGrid1?.piece && !middleGrid2?.piece) {
            activePiecesByGrid(targetGrid);
        }
    }
}

function findGridArea(grid: RelatiGrid, lastAreaId: number, gridIdToAreaId: Int8Array) {
    if (!grid.piece && gridIdToAreaId[grid.i] === -1) {
        gridIdToAreaId[grid.i] = lastAreaId;

        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                if (dx || dy) {
                    const nearbyGrid = getGridTo(grid, dx, dy);

                    if (nearbyGrid) {
                        findGridArea(nearbyGrid, lastAreaId, gridIdToAreaId);
                    }
                }
            }
        }

        return lastAreaId + 1;
    }

    return lastAreaId;
}

class RelatiAI {
    public static analysis({ board }: RelatiGame) {
        const result = { "O": 0, "X": 0 };
        const gridIdToAreaId: Int8Array = new Int8Array(board.grids.length);
        const areaIdToSymbol: string[] = [];
        const areaIdToGridsCount: number[] = [];
        let lastAreaId = 0;

        for (let grid of board.grids) {
            if (grid.piece) {
                continue;
            }

            const isOPlaceable = isGridHasAvailableRelatiRouteBySymbol(grid, "O");
            const isXPlaceable = isGridHasAvailableRelatiRouteBySymbol(grid, "X");

            if (isOPlaceable && isXPlaceable) {
                result["O"] += 0;
                result["X"] += 0;
            }
            else if (isOPlaceable) {
                result["O"] += 1;
                result["X"] -= 2;
            }
            else if (isXPlaceable) {
                result["O"] -= 2;
                result["X"] += 1;
            }
        }

        for (let grid of board.grids) {
            gridIdToAreaId[grid.i] = -1;
        }

        for (let grid of board.grids) {
            lastAreaId = findGridArea(grid, lastAreaId, gridIdToAreaId);
        }

        for (let areaId = 0; areaId < lastAreaId; areaId++) {
            let areaSymbol = "?";
            let gridsCountOfArea = 0;

            findAreaSymbol:
            for (let gridId = 0; gridId < gridIdToAreaId.length; gridId++) {
                const grid = board.grids[gridId];

                if (gridIdToAreaId[grid.i] !== areaId) {
                    continue;
                }

                for (let dx = -1; dx < 2; dx++) {
                    for (let dy = -1; dy < 2; dy++) {
                        if (dx || dy) {
                            const nearbyGrid = getGridTo(grid, dx, dy);

                            if (nearbyGrid?.piece && !nearbyGrid.piece.disabled) {
                                if (areaSymbol === "?") {
                                    areaSymbol = nearbyGrid.piece.symbol;
                                }
                                else if (areaSymbol !== nearbyGrid.piece.symbol) {
                                    areaSymbol = "N";
                                    break findAreaSymbol;
                                }
                            }
                        }
                    }
                }

                gridsCountOfArea++;
            }

            areaIdToGridsCount[areaId] = gridsCountOfArea;
            areaIdToSymbol[areaId] = areaSymbol;

            if (areaSymbol === "O") {
                result["O"] += gridsCountOfArea * 10;
                result["X"] -= gridsCountOfArea * 20;
            }
            else if (areaSymbol === "X") {
                result["X"] += gridsCountOfArea * 10;
                result["O"] -= gridsCountOfArea * 20;
            }
        }

        return { result, gridIdToAreaId, areaIdToSymbol, areaIdToGridsCount };
    }

    public static findBestStep(
        game: RelatiGame,
        level: number,
        playerSymbol: RelatiSymbol,
        nowPlayerSymbol: RelatiSymbol = playerSymbol,
        alpha: { point: number, grid: RelatiGrid | null } = { point: -Infinity, grid: null },
        beta: { point: number, grid: RelatiGrid | null } = { point: Infinity, grid: null }
    ) {
        // console.groupCollapsed(`第${level}層, 回合: ${game.turn}, 目前符號: ${nowPlayerSymbol}`);

        if (playerSymbol === nowPlayerSymbol) {
            for (let grid of game.board.grids) {
                if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, nowPlayerSymbol)) {
                    continue;
                }

                let result: { point: number, grid: RelatiGrid | null };

                RelatiAI.placement(game, grid, nowPlayerSymbol);
                // console.log(`${nowPlayerSymbol}放了一子在(${grid.x}, ${grid.y}), 回合: ${game.turn}`);
                // console.log(game.board.grids.reduce((result, grid, i) => {
                //     return result + (i % 9 ? "" : "|") + (grid.piece?.symbol || " ") + "|" + (i % 9 === 8 ? "\n" : "");
                // }, ""));

                if (level) {
                    result = RelatiAI.findBestStep(
                        game,
                        level - 1,
                        playerSymbol,
                        nowPlayerSymbol === "O" ? "X" : "O",
                        alpha,
                        beta
                    );

                    result.grid = grid;
                } else {
                    const point = RelatiAI.analysis(game).result[playerSymbol as "O" | "X"];
                    result = { point, grid };
                }

                RelatiAI.removement(game, grid, playerSymbol);
                // console.log(`${nowPlayerSymbol}提了一子在(${grid.x}, ${grid.y}), 回合: ${game.turn}, 分數: ${result.point}`);

                if (alpha.point < result.point) alpha = result;
                if (beta.point <= alpha.point) break;
            }

            // console.groupEnd();
            return alpha;
        }
        else {
            for (let grid of game.board.grids) {
                if (grid.piece || !isGridHasAvailableRelatiRouteBySymbol(grid, nowPlayerSymbol)) {
                    continue;
                }

                let result: { point: number, grid: RelatiGrid | null };

                RelatiAI.placement(game, grid, nowPlayerSymbol);
                // console.log(`${nowPlayerSymbol}放了一子在(${grid.x}, ${grid.y}), 回合: ${game.turn}`);
                // console.log(game.board.grids.reduce((result, grid, i) => {
                //     return result + (i % 9 ? "" : "|") + (grid.piece?.symbol || " ") + "|" + (i % 9 === 8 ? "\n" : "");
                // }, ""));

                if (level) {
                    result = RelatiAI.findBestStep(
                        game,
                        level - 1,
                        playerSymbol,
                        nowPlayerSymbol === "O" ? "X" : "O",
                        alpha,
                        beta
                    );

                    result.grid = grid;
                } else {
                    const point = RelatiAI.analysis(game).result[playerSymbol as "O" | "X"];
                    result = { point, grid };
                }

                // console.log(`${nowPlayerSymbol}提了一子在(${grid.x}, ${grid.y}), 回合: ${game.turn}, 分數: ${result.point}`);
                RelatiAI.removement(game, grid, playerSymbol);

                if (beta.point > result.point) beta = result;
                if (beta.point <= alpha.point) break;
            }

            // console.groupEnd();
            return beta;
        }
    }

    public static placement(game: RelatiGame, grid: RelatiGrid, symbol: RelatiSymbol) {
        if (!grid || grid.piece) {
            return;
        }

        if (game.turn < game.playersCount) {
            grid.piece = {
                symbol,
                primary: true,
                disabled: false
            };

            game.symbolToSourceGrid[symbol] = grid;
        }
        else if (isGridHasAvailableRelatiRouteBySymbol(grid, symbol)) {
            grid.piece = {
                symbol,
                primary: false,
                disabled: false
            };
        }
        else {
            return;
        }

        game.turn++;
        disableAllPiecesByBoard(game.board, symbol === "O" ? "X" : "O");
        const sourceGrid = game.symbolToSourceGrid[symbol === "O" ? "X" : "O"];

        if (sourceGrid) {
            activePiecesByGrid(sourceGrid);
        }
    }

    public static removement(game: RelatiGame, grid: RelatiGrid, symbol: RelatiSymbol) {
        delete grid.piece;
        game.turn--;
        disableAllPiecesByBoard(game.board, symbol === "O" ? "X" : "O");
        const sourceGrid = game.symbolToSourceGrid[symbol === "O" ? "X" : "O"];

        if (sourceGrid) {
            activePiecesByGrid(sourceGrid);
        }
    }
}

export default RelatiAI;
