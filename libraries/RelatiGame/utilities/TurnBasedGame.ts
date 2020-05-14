class TurnBasedGame {
    public turn: number;
    public playersCount: number;

    constructor(playersCount: number) {
        this.turn = 0;
        this.playersCount = playersCount;
    }

    public getNowPlayer() {
        return this.turn % this.playersCount;
    }

    public getPlayerByTurn(turn: number) {
        return turn % this.playersCount;
    }
}

export default TurnBasedGame;
