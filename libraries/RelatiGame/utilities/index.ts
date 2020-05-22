import { RelatiSymbol, RelatiBoard, RelatiPiece } from "../types";
export { default as TurnBasedGame } from "./TurnBasedGame";
export const RelatiSymbols: RelatiSymbol[] = ["O", "X", "D", "U", "A"];

export const convertBoardToPieceCodes = (board: RelatiBoard) => {
    const pieceCodes = board.grids.map(grid => getCodeByPiece(grid.piece)).join("");
    return pieceCodes;
};

export function getCodeByPiece(piece: RelatiPiece | undefined) {
    if (!piece) {
        return "0";
    }
    else {
        let code = 0b000;

        if (piece.symbol === "X") {
            code |= 0b001;
        }

        if (!piece.primary) {
            if (piece.disabled) {
                code |= 0b100;
            }
            else {
                code |= 0b010;
            }
        }

        return (code + 1).toString();
    }
}

export function createPieceByCode(code: string): RelatiPiece | undefined {
    switch (code) {
        case "1": return { symbol: "O", primary: true, disabled: false };
        case "2": return { symbol: "X", primary: true, disabled: false };
        case "3": return { symbol: "O", primary: false, disabled: false };
        case "4": return { symbol: "X", primary: false, disabled: false };
        case "5": return { symbol: "O", primary: false, disabled: true };
        case "6": return { symbol: "X", primary: false, disabled: true };
    }
}

export function printPointContent(points: Int8Array) {
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

export function printBoardContent(board: RelatiBoard) {
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
