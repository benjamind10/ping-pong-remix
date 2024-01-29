export type UserType = {
  id: string;
  email?: string;
  password?: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Other fields as needed
};

export type ScoreType = {
  _id?: string;
  gameType: string;
  player1Id: string;
  player2Id: string;
  score1: number;
  score2: number;
  winnerId?: string; // Made optional
  loserId?: string; // Made optional
  firstServe: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  player1: string;
  player2: string;
  winner: string;
  loser: string;
};

export interface ScoreData {
  _id?: string;
  gameType: string;
  player1Id: string;
  player2Id: string;
  score1: number;
  score2: number;
  winnerId: string; // Made optional
  loserId: string; // Made optional
  firstServe: string;
  updatedAt?: any;
  createdAt?: any;
}

export type ScoreTypeWithUsernames = ScoreType & {
  winnerUsername: string;
  loserUsername: string;
};
