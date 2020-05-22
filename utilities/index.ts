import RelatiGame from "../libraries/RelatiGame";

export const downloadRecordJSONByRelatiGame = (game: RelatiGame) => {
    const placementRecords = game.placementRecords.map(([x, y]) => game.board.getGridAt(x, y)?.i);
    const placementRecordsJSONText = JSON.stringify(placementRecords);
    const fileType = "text/json";
    const file = new Blob([placementRecordsJSONText], { type: fileType });
    const fileUrl = URL.createObjectURL(file);
    const nowTime = Date.now();
    const fileName = `relati-record-at-${nowTime}.json`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
