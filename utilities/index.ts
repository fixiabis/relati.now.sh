import RelatiGame from "../libraries/RelatiGame";
import { RelatiSymbolRoute, RelatiSymbolColor } from "../components/Relati/RelatiPiece";

export const delay = (ms: number) => new Promise(done => setTimeout(done, ms));

export const randomCode = (length: number) => {
    let result = "";

    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 36).toString(36);
    }

    return result;
};

export const createBoardSVGTextByRelatiGame = (game: RelatiGame) => {
    const placementRecordsJSONText = JSON.stringify(game.records);
    const viewWidth = game.board.width * 5;
    const viewHeight = game.board.height * 5;
    const gridLineXMLTexts = [];

    const gridPieceXMLTexts = game.board.grids.map(({ x, y, piece }, i) => {
        if (piece) {
            const { symbol, primary, disabled } = piece;
            const definition = `M ${x * 5} ${y * 5} ${RelatiSymbolRoute[symbol]}`;
            const color = disabled ? "#888" : RelatiSymbolColor[symbol];

            if (primary) {
                return (
                    `<path d="${definition}" stroke="${color}" stroke-width="1"></path>` +
                    `<path d="${definition}" stroke="#f2f2f2" stroke-width="0.5"></path>`
                );
            }
            else {
                return `<path d="${definition}" stroke="${color}" stroke-width="0.6"></path>`;
            }
        }
    });

    for (let x = 1; x < game.board.height; x++) {
        const d = `M 0 ${x * 5} H ${viewWidth}`;
        gridLineXMLTexts.push(`<path d="${d}"></path>`);
    }

    for (let y = 1; y < game.board.width; y++) {
        const d = `M ${y * 5} 0 V ${viewHeight}`;
        gridLineXMLTexts.push(`<path d="${d}"></path>`);
    }

    const gridLinesGroupXMLText = (
        `<g className="grid-lines" stroke="#888" stroke-width="0.4">` +
        gridLineXMLTexts.join("") +
        `</g>`
    );

    const gridPiecesGroupXMLText = (
        `<g className="grid-pieces" fill="none">` +
        gridPieceXMLTexts.join("") +
        `</g>`
    );

    return (
        `<?xml version="1.0"?>` +
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">` +
        `<svg width="${viewWidth}" height="${viewHeight}" xmlns="http://www.w3.org/2000/svg">` +
        `<script>${placementRecordsJSONText}</script>` +
        `<rect width="100%" height="100%" fill="#f2f2f2" /> ` +
        gridLinesGroupXMLText +
        gridPiecesGroupXMLText +
        `</svg>`
    );
};
