import RelatiBoard from "./RelatiBoard";
import { RelatiStatus, RelatiSymbol, isGridHasAvailableRelatiRouteByPlayerIndex, disableAllPiecesByBoard, activePiecesByGrid } from "./utils";

class RelatiGame {
    public turn: number;
    public board: RelatiBoard;
    public playersCount: number;
    public playerIndexOfWinner: number;
    public playerIndexToSourceGridIndex: number[];

    constructor(playersCount: number) {
        this.turn = 0;
        this.playerIndexOfWinner = -2;
        this.playersCount = playersCount;
        this.board = new RelatiBoard(9, 9);
        this.playerIndexToSourceGridIndex = [];
    }

    public getPlayerIndexByTurn(turn: number) {
        return turn % this.playersCount;
    }

    public getNowPlayerIndex() {
        return this.turn % this.playersCount;
    }

    public placeSymbolByCoordinate(x: number, y: number, playerIndex: number = this.getNowPlayerIndex()) {
        const grid = this.board.getGridAt(x, y);

        if (!grid || grid.piece) {
            return;
        }

        if (this.turn < this.playersCount) {
            grid.piece = playerIndex | RelatiSymbol.Placed | RelatiStatus.Actived | RelatiStatus.Primary;
            this.playerIndexToSourceGridIndex[playerIndex] = grid.i;
        }
        else if (isGridHasAvailableRelatiRouteByPlayerIndex(grid, playerIndex)) {
            grid.piece = playerIndex | RelatiSymbol.Placed | RelatiStatus.Actived;
        }
        else {
            return;
        }

        this.turn++;

        if (this.turn >= this.playersCount) {
            disableAllPiecesByBoard(this.board);

            for (let playerIndex = 0; playerIndex < this.playersCount; playerIndex++) {
                const nextPlayerSourceGridIndex = this.playerIndexToSourceGridIndex[playerIndex];
                const nextPlayerSourceGrid = this.board.grids[nextPlayerSourceGridIndex];
                activePiecesByGrid(nextPlayerSourceGrid, playerIndex);
            }
        }

        if (this.turn >= this.playersCount) {
            let isPlayerPlaceable = false;

            for (let i = 0; i < this.playersCount; i++) {
                const playerIndex = this.getNowPlayerIndex();

                const isPlaceableGridExist = this.board.grids.some(grid =>
                    !grid.piece && isGridHasAvailableRelatiRouteByPlayerIndex(grid, playerIndex)
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
                this.playerIndexOfWinner = -1;
            }
            else if (this.getNowPlayerIndex() === playerIndex) {
                this.playerIndexOfWinner = playerIndex;
            }
        }
    }
}

export default RelatiGame;
