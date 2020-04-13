export const delay = (ms: number) => new Promise(finishDelay => setTimeout(finishDelay, ms));
