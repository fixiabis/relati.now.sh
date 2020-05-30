export interface UserInfo {
    name: string | null;
    avatarURL: string | null;
}

export interface GameRoundInfo {
    type: string,
    isOver: boolean,
    winner: number,
    records: GameRoundRecord[],
    playerO: string | null,
    playerX: string | null,
    time: number,
}

export interface GameRoundRecord {
    action: string;
    params: number[];
}
