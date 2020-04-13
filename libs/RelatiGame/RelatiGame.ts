import { GridBoard, Grid } from "gridboard";
import { RelatiPiece } from "./types";
import { isGridPlaceableBySymbol, disableAllPieces, activePiecesBySourceGrid } from "./utils";

const SYMBOLS = "OXDUA".split("") as RelatiPiece["symbol"][];

class RelatiGame {
    public turn: number;

    public symbolToSourceGrid: {
        [symbol: string]: Grid<RelatiPiece>
    };

    public symbolOfWinner: RelatiPiece["symbol"] | "N" | "?";
    public playersCount: number;
    public board: GridBoard<RelatiPiece>;

    constructor(playersCount: number) {
        this.turn = 0;
        this.symbolOfWinner = "?";
        this.symbolToSourceGrid = {};
        this.playersCount = playersCount;
        this.board = new GridBoard<RelatiPiece>(9, 9);
    }

    public getNowPlayerSymbol() {
        return SYMBOLS[this.turn % this.playersCount];
    }

    public getPlayerSymbolByTurn(turn: number) {
        return SYMBOLS[turn % this.playersCount];
    }

    public placeSymbolToCoordinate(x: number, y: number, symbol = this.getNowPlayerSymbol()) {
        const grid = this.board.getGridAt(x, y);

        if (!grid) {
            return;
        }

        if (this.turn < this.playersCount && !grid.piece) {
            grid.piece = {
                symbol,
                primary: true,
                disabled: false
            };

            this.symbolToSourceGrid[symbol] = grid;
        }
        else if (isGridPlaceableBySymbol(grid, symbol)) {
            grid.piece = {
                symbol,
                primary: false,
                disabled: false
            };
        }
        else {
            return;
        }

        disableAllPieces(this.board);

        for (let symbol in this.symbolToSourceGrid) {
            let sourceGrid = this.symbolToSourceGrid[symbol];
            activePiecesBySourceGrid(sourceGrid);
        }

        this.turn++;

        if (this.turn >= this.playersCount) {
            let playerPlaceable = false;

            for (let i = 0; i < this.playersCount; i++) {
                let symbol = this.getNowPlayerSymbol();
                let hasPlaceableGrid = this.board.grids.some(grid => isGridPlaceableBySymbol(grid, symbol));

                if (hasPlaceableGrid) {
                    playerPlaceable = true;
                    break;
                } else this.turn++;
            }

            if (!playerPlaceable) this.symbolOfWinner = "N";
            else if (this.getNowPlayerSymbol() === symbol) this.symbolOfWinner = symbol;
        }
    }
}

export default RelatiGame;
