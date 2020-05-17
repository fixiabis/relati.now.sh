import { GridBoard, Coordinate } from "gridboard";
import RelatiGameBasicRule from "./RelatiGameBasicRule";
import { RelatiBoard, RelatiPiece, RelatiGrid, RelatiGameRule } from "./types";
import { RelatiSymbols, TurnBasedGame } from "./utilities";

class RelatiGame extends TurnBasedGame {
    public winner: number;
    public isOver: boolean;
    public readonly board: RelatiBoard;
    public readonly rule: RelatiGameRule;
    public readonly playerSourceGrids: RelatiGrid[];
    public readonly placementRecords: Coordinate[];

    constructor(playersCount: number, rule: RelatiGameRule) {
        super(playersCount);
        this.rule = rule;
        this.board = new GridBoard<RelatiPiece>(rule.boardWidth, rule.boardHeight);
        this.winner = -1;
        this.isOver = false;
        this.playerSourceGrids = [];
        this.placementRecords = [];
        DEBUG: Object.assign(globalThis, { GAME: this });
    }

    public restart() {
        this.turn = 0;
        this.winner = -1;
        this.isOver = false;
        this.playerSourceGrids.splice(0, this.turn);
        this.board.grids.forEach(grid => delete grid.piece);
        this.playerSourceGrids.splice(0, this.playersCount);
    }

    public undo() {
        const [x, y] = this.placementRecords.pop();
        const grid = this.board.getGridAt(x, y);

        if (grid?.piece) {
            delete grid.piece;
        }

        this.turn--;
        this.reenableAllPieces();
    }

    public doPlacementByCoordinate(x: number, y: number) {
        const nowPlayer = this.getNowPlayer();
        this.doPlacementByCoordinateAndPlayer(x, y, nowPlayer);
    }

    public doPlacementByCoordinateAndPlayer(x: number, y: number, player: number) {
        const playerSymbol = RelatiSymbols[player] as RelatiPiece["symbol"];
        const grid = this.board.getGridAt(x, y) as RelatiGrid;

        const isPlayerCanDoPlacement =
            RelatiGameBasicRule.validateIsPlayerCanDoPlacement(this, grid, player) &&
            this.rule.validateIsPlayerCanDoPlacement(this, grid, player);

        if (!isPlayerCanDoPlacement) {
            return;
        }

        const isNotAllPlayerSourcePlaced = this.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            grid.piece = {
                symbol: playerSymbol,
                primary: true,
                disabled: false,
            };

            this.playerSourceGrids[player] = grid;
        }
        else {
            grid.piece = {
                symbol: playerSymbol,
                primary: false,
                disabled: false,
            };
        }

        this.turn++;
        this.placementRecords.push([x, y]);
    }

    public reenableAllPieces() {
        this.rule.disableAllPieces(this);
        this.rule.enableAllPieces(this);
    }

    public checkIsOverAndFindWinner() {
        const isNotAllPlayerSourcePlaced = this.getIsNotAllPlayerSourcePlaced();

        if (isNotAllPlayerSourcePlaced) {
            return;
        }

        let canDoPlacementPlayersCount = 0;

        for (; canDoPlacementPlayersCount !== this.playersCount; canDoPlacementPlayersCount++) {
            const player = this.getNowPlayer();

            const isPlayerCanDoPlacement = this.board.grids.some(
                grid =>
                    RelatiGameBasicRule.validateIsPlayerCanDoPlacement(this, grid, player) &&
                    this.rule.validateIsPlayerCanDoPlacement(this, grid, player)
            );

            if (isPlayerCanDoPlacement) {
                if (canDoPlacementPlayersCount === this.playersCount - 1) {
                    this.winner = player;
                    this.isOver = true;
                }

                return;
            }
            else {
                this.turn++;
            }
        }

        if (canDoPlacementPlayersCount === this.playersCount) {
            this.isOver = true;
        }
    }

    public getIsNotAllPlayerSourcePlaced() {
        return this.turn < this.playersCount;
    }
}

export default RelatiGame;
