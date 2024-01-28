import { prisma } from '~/data/database.server';
import { ScoreData } from '~/types';

export async function storeScores(scoreData: ScoreData) {
  try {
    const createData = {
      gameId: scoreData.gameId,
      gameType: scoreData.gameType,
      player1: { connect: { id: scoreData.player1Id } }, // Connect player1
      player2: { connect: { id: scoreData.player2Id } }, // Connect player2
      score1: scoreData.score1,
      score2: scoreData.score2,
      firstServe: scoreData.firstServe,
      ...(scoreData.winnerId && {
        winner: { connect: { id: scoreData.winnerId } }, // Connect winner if provided
      }),
      ...(scoreData.loserId && {
        loser: { connect: { id: scoreData.loserId } }, // Connect loser if provided
      }),
    };

    return await prisma.score_test.create({
      data: createData,
    });
  } catch (error) {
    console.error('Error adding score:', error.message);
    throw new Error(`Failed to add score: ${error.message}`);
  }
}


interface ScoreQuery {
  searchTerm?: string;
}

export async function getStoredScores() {
  try {
    return await prisma.score_test.findMany({
      include: {
        player1: true, // Include player1 details
        player2: true, // Include player2 details
        winner: true, // Include winner details
        loser: true, // Include loser details
      },
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
}

export async function deleteScore(id: string) {
  try {
    await prisma.score_test.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting score:', error);
    throw new Error('Failed to delete score.');
  }
}
