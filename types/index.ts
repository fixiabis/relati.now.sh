export interface UserInfo {
    name: string | null;
    avatarURL: string | null;
}

export interface GameRoundInfo {
    type: string,
    isOver: boolean,
    winner: number,
    playerO: string | null,
    playerX: string | null,
    time: number,
}
