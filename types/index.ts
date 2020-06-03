export interface UserInfo {
    name: string | null;
    avatarURL: string | null;
}

export interface GameRoundInfo {
    type: string;
    turn: number;
    pieces: string;
    actions: GameRoundAction[];
    isOver: boolean;
    winner: number;
    playerO: string | null;
    playerX: string | null;
    time: number;
}

export interface GameRoundAction {
    name: string;
    params: string;
}
