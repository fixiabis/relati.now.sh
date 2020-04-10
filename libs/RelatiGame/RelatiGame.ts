import { GridBoard, Grid } from "gridboard";
import RelatiRoutes from "./RelatiRoutes";

interface Piece {
    symbol: "" | "O" | "X" | "D" | "U" | "A";
    primary: boolean;
    disabled: boolean;
}

const SYMBOLS = "OXDUA".split("") as Piece["symbol"][];

function isPlaceable(grid: Grid<Piece>, symbol: Piece["symbol"]) {
    for (let routes of RelatiRoutes) {
        const [source, ...middles] = routes;
        const sourceGrid = grid.getGridTo(source);
        const middleGrids = middles.map(middle => grid.getGridTo(middle));

        if (middleGrids.some(grid => grid.piece)) {
            continue;
        }

        if (sourceGrid.piece.symbol === symbol) {
            return true;
        }
    }

    return false;
}

class RelatiGame {
    public turn: number;
    public playersCount: number;
    public board: GridBoard<Piece>;

    constructor(playersCount: number) {
        this.turn = 0;
        this.playersCount = playersCount;
        this.board = new GridBoard<Piece>(9, 9);
    }

    public onGridSelect(x: number, y: number) {
        const grid = this.board.getGridAt(x, y);

        if (grid.piece) {
            return;
        }

        const nowPlayerSymbol = SYMBOLS[this.turn % this.playersCount];

        if (this.turn < this.playersCount) {
            grid.piece = {
                symbol: nowPlayerSymbol,
                primary: true,
                disabled: false
            };
        }
        else if (isPlaceable(grid, nowPlayerSymbol)) {
            grid.piece = {
                symbol: nowPlayerSymbol,
                primary: false,
                disabled: false
            };
        }
        else {
            return;
        }

        this.turn++;
    }
}

export default RelatiGame;
