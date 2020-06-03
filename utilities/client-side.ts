import { RelatiGame } from "../libraries";
import { createBoardSVGTextByRelatiGame } from "./index";

export const downloadRecordSVGByRelatiGame = (game: RelatiGame) => {
    const boardSVGText = createBoardSVGTextByRelatiGame(game);
    const fileType = "image/svg+xml";
    const nowTime = Date.now();
    const fileName = `relati-x${game.board.width}-record-at-${nowTime}.svg`;
    downloadFile(fileName, fileType, boardSVGText);
};

export const downloadRecordJSONByRelatiGame = (game: RelatiGame) => {
    const placementRecordsJSONText = JSON.stringify(game.records);
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
