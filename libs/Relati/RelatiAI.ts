import { isGridHasAvailableRelatiRouteBySymbol, disableAllPiecesByBoard, RELATI_SYMBOLS, activePiecesByGrid } from "./utils";
import RelatiGame from "./RelatiGame";
import { Direction } from "gridboard";
import { RelatiGrid, RelatiSymbol } from "./types";

const NEARBY_DIRECTIONS = [
    Direction`F`,
    Direction`B`,
    Direction`L`,
    Direction`R`,
    Direction`FL`,
    Direction`FR`,
    Direction`BL`,
    Direction`BR`,
];

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

                for (let direction of NEARBY_DIRECTIONS) {
                    const nearByGrid = grid.getGridTo(direction);

                    if (nearByGrid?.piece && !nearByGrid.piece.disabled) {
                        if (areaSymbol === "?") {
                            areaSymbol = nearByGrid.piece.symbol;
                        }
                        else if (areaSymbol !== nearByGrid.piece.symbol) {
                            areaSymbol = "N";
                            break findAreaSymbol;
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

                RelatiAI.removement(game, grid);
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
                RelatiAI.removement(game, grid);

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
        disableAllPiecesByBoard(game.board);

        for (let symbol of RELATI_SYMBOLS) {
            const sourceGrid = game.symbolToSourceGrid[symbol];

            if (sourceGrid) {
                activePiecesByGrid(sourceGrid);
            }
        }
    }

    public static removement(game: RelatiGame, grid: RelatiGrid) {
        delete grid.piece;

        game.turn--;
        disableAllPiecesByBoard(game.board);

        for (let symbol of RELATI_SYMBOLS) {
            const sourceGrid = game.symbolToSourceGrid[symbol];

            if (sourceGrid) {
                activePiecesByGrid(sourceGrid);
            }
        }
    }
}

function findGridArea(grid: RelatiGrid, lastAreaId: number, gridIdToAreaId: Int8Array) {
    if (!grid.piece && gridIdToAreaId[grid.i] === -1) {
        gridIdToAreaId[grid.i] = lastAreaId;

        for (let direction of NEARBY_DIRECTIONS) {
            const nearbyGrid = grid.getGridTo(direction);

            if (nearbyGrid) {
                findGridArea(nearbyGrid, lastAreaId, gridIdToAreaId);
            }
        }

        return lastAreaId + 1;
    }

    return lastAreaId;
}

export default RelatiAI;
