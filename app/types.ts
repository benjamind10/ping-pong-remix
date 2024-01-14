export type Score = {
    gameId: number;
    gameType: string;
    player1: string;
    player2: string;
    score1: number;
    score2: number;
    winner: string;
    loser: string;
    firstServe: string;
    createdAt?: Date;
    updateAt?: Date;
};
