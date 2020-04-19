import RelatiGrid from "./RelatiGrid";

class RelatiBoard {
    public readonly width: number;
    public readonly height: number;
    public readonly grids: RelatiGrid[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new RelatiGrid(x, y, this);
                this.grids[grid.i] = grid;
            }
        }
    }

    public getGridByAbsoluteCoordinate(x: number, y: number): RelatiGrid | null {
        const isOverBoundary = (
            x < 0 ||
            x >= this.width ||
            y < 0 ||
            y >= this.height
        );

        if (isOverBoundary) {
            return null;
        }

        const i = y * this.width + x;
        return this.grids[i];
    }
}

interface RelatiBoard {
    getGridAt(x: number, y: number): RelatiGrid | null;
}

RelatiBoard.prototype.getGridAt = RelatiBoard.prototype.getGridByAbsoluteCoordinate;

export default RelatiBoard;
