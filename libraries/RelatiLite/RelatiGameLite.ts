import { GridBoard, Coordinate } from "gridboard";
import { RelatiPiece, RelatiSymbol, RelatiGrid } from "./types";
import { RELATI_SYMBOLS, isGridHasAvailableRelatiRouteBySymbol, activePiecesByGrid, disableAllPiecesByBoard } from "./utils";

class RelatiGameLite {
    public turn: number;
    public static recentInstance?: RelatiGameLite;
    public placementRecords: Coordinate[];
    public playersCount: number;
    public createdTime: number;
    public board: GridBoard<RelatiPiece>;
    public symbolOfWinner: "?" | "N" | RelatiSymbol;
    public symbolToSourceGrid: Record<RelatiSymbol, RelatiGrid | undefined>;

    constructor(playersCount: number, boardWidth: number = 5, boardHeight: number = 5) {
        this.turn = 0;
        this.symbolOfWinner = "?";
        this.placementRecords = [];
        this.playersCount = playersCount;
        this.createdTime = Date.now();
        this.board = new GridBoard<RelatiPiece>(boardWidth, boardHeight);
        this.symbolToSourceGrid = {} as RelatiGameLite["symbolToSourceGrid"];
        RelatiGameLite.recentInstance = this;
    }

    public restart() {
        this.turn = 0;
        this.symbolOfWinner = "?";
        this.placementRecords = [];
        this.board.grids.forEach(grid => delete grid.piece);
        this.symbolToSourceGrid = {} as RelatiGameLite["symbolToSourceGrid"];
    }

    public getNowPlayerSymbol() {
        return RELATI_SYMBOLS[this.turn % this.playersCount];
    }

    public getPlayerSymbolByTurn(turn: number) {
        return RELATI_SYMBOLS[turn % this.playersCount];
    }

    public undo() {
        const [x, y] = this.placementRecords.pop();
        const grid = this.board.getGridAt(x, y);

        if (grid?.piece) {
            delete grid.piece;
        }

        this.turn--;
        disableAllPiecesByBoard(this.board);

        for (let symbol of RELATI_SYMBOLS) {
            const sourceGrid = this.symbolToSourceGrid[symbol];

            if (sourceGrid) {
                activePiecesByGrid(sourceGrid);
            }
        }
    }

    public placeSymbolByCoordinate(x: number, y: number, symbol: RelatiSymbol = this.getNowPlayerSymbol()) {
        const grid = this.board.getGridAt(x, y);

        if (!grid || grid.piece) {
            return;
        }

        if (this.turn < this.playersCount) {
            grid.piece = {
                symbol,
                primary: true,
                disabled: false
            };

            this.symbolToSourceGrid[symbol] = grid;
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

        this.placementRecords.push([x, y]);
        disableAllPiecesByBoard(this.board);

        for (let symbol of RELATI_SYMBOLS) {
            const sourceGrid = this.symbolToSourceGrid[symbol];

            if (sourceGrid) {
                activePiecesByGrid(sourceGrid);
            }
        }

        this.turn++;

        if (this.turn >= this.playersCount) {
            let isPlayerPlaceable = false;

            for (let i = 0; i < this.playersCount; i++) {
                const symbol = this.getNowPlayerSymbol();

                const isPlaceableGridExist = this.board.grids.some(grid =>
                    !grid.piece && isGridHasAvailableRelatiRouteBySymbol(grid, symbol)
                );

                if (isPlaceableGridExist) {
                    isPlayerPlaceable = true;
                    break;
                }
                else {
                    this.turn++;
                }
            }

            if (!isPlayerPlaceable) {
                this.symbolOfWinner = "N";
            }
            else if (this.getNowPlayerSymbol() === symbol) {
                this.symbolOfWinner = symbol;
            }
        }
    }
}

export default RelatiGameLite;
