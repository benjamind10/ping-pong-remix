export type UserType = {
  id: string;
  email?: string;
  password?: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Other fields as needed
};

export type Score = {
  gameId: number;
  gameType: string;
  player1Id: string; // Ensure this is a string
  player2Id: string; // Ensure this is a string
  score1: number;
  score2: number;
  winnerId?: string; // Optional string
  loserId?: string; // Optional string
  firstServe: string;
  createdAt?: string;
  updatedAt?: string;
  player1?: string;
  player2?: string;
  winner?: string;
  loser?: string;
};

export interface ScoreData {
  gameId: number;
  gameType: string;
  player1Id: string;
  player2Id: string;
  score1: number;
  score2: number;
  winnerId?: string;
  loserId?: string;
  firstServe: string;
}
