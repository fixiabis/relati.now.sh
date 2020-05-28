import RelatiGame from "../libraries/RelatiGame";
import { RelatiSymbolRoute, RelatiSymbolColor } from "../components/Relati/RelatiPiece";

export const createBoardSVGTextByRelatiGame = (game: RelatiGame) => {
    const placementRecordsJSONText = JSON.stringify(game.placementRecords);
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

export const downloadRecordSVGByRelatiGame = (game: RelatiGame) => {
    const boardSVGText = createBoardSVGTextByRelatiGame(game);
    const fileType = "image/svg+xml";
    const nowTime = Date.now();
    const fileName = `relati-x${game.board.width}-record-at-${nowTime}.svg`;
    downloadFile(fileName, fileType, boardSVGText);
};

export const downloadRecordJSONByRelatiGame = (game: RelatiGame) => {
    const placementRecordsJSONText = JSON.stringify(game.placementRecords);
    const fileType = "text/json";
    const nowTime = Date.now();
    const fileName = `relati-x${game.board.width}-record-at-${nowTime}.json`;
    downloadFile(fileName, fileType, placementRecordsJSONText);
};

export const downloadFile = (fileName: string, fileType: string, fileContent: string) => {
    const file = new Blob([fileContent], { type: fileType });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
