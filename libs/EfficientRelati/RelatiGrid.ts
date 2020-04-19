import RelatiBoard from "./RelatiBoard";

class RelatiGrid {
    public i: number;
    public x: number;
    public y: number;
    public board: RelatiBoard;
    public piece: number;

    constructor(x: number, y: number, board: RelatiBoard) {
        this.i = y * board.width + x;
        this.x = x;
        this.y = y;
        this.piece = 0;
        this.board = board;
    }

    public getGridByRelativeCoordinate(dx: number, dy: number): RelatiGrid | null {
        const x = this.x + dx;
        const y = this.y + dy;
        return this.board.getGridByAbsoluteCoordinate(x, y);
    }
}

interface RelatiGrid {
    getGridTo: {
        (x: number, y: number): RelatiGrid | null;
    };
}

RelatiGrid.prototype.getGridTo = RelatiGrid.prototype.getGridByRelativeCoordinate;

export default RelatiGrid;
