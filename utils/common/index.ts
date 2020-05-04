export const delay = (ms: number) => new Promise(finishDelay => setTimeout(finishDelay, ms));

export const formatDate = (date: Date) => [
    date.getFullYear(), "-",
    date.getMonth(), "-",
    date.getDate(), " ",
    date.getHours(), ":",
    date.getMinutes(), ":",
    date.getSeconds(),
].map((v, i) => i % 2 || v > 9 ? v : `0${v}`).join("");
