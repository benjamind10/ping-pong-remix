export type Score = {
  id?: string;
  gameId: number;
  gameType: string;
  player1: string;
  player2: string;
  score1: number;
  score2: number;
  winner: string;
  loser: string;
  firstServe: string;
  createdAt?: string;
  updateAt?: string;
};
