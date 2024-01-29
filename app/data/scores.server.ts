import { prisma } from '~/data/database.server';
import { ScoreData, ScoreType } from '~/types';

export async function storeScores(scoreData: ScoreData) {
  try {
    if (scoreData.winnerId && scoreData.loserId) {
      return await prisma.$transaction(async (prisma) => {
        // Create the score and link it to player1 and player2
        const score = await prisma.score.create({
          data: {
            gameType: scoreData.gameType,
            player1Id: scoreData.player1Id,
            player2Id: scoreData.player2Id,
            score1: scoreData.score1,
            score2: scoreData.score2,
            firstServe: scoreData.firstServe,
            winnerId: scoreData.winnerId,
            loserId: scoreData.loserId,
            createdAt: scoreData.createdAt,
            updatedAt: scoreData.updatedAt,
          },
        });

        // Update the winner's wins and loser's losses
        await prisma.user.update({
          where: { id: scoreData.winnerId },
          data: { wins: { increment: 1 } },
        });
        await prisma.user.update({
          where: { id: scoreData.loserId },
          data: { losses: { increment: 1 } },
        });

        return score;
      });
    } else {
      throw new Error('Winner and loser IDs must be provided');
    }
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
}

export async function getStoredScores(): Promise<ScoreType[]> {
  try {
    const prismaScores = await prisma.score.findMany({
      include: {
        player1: true,
        player2: true,
      },
    });

    return prismaScores.map((score) => ({
      _id: score.id,
      gameType: score.gameType,
      player1Id: score.player1Id,
      player2Id: score.player2Id,
      score1: score.score1,
      score2: score.score2,
      winnerId: score.winnerId,
      loserId: score.loserId,
      firstServe: score.firstServe,
      createdAt: new Date(score.createdAt),
      updatedAt: new Date(score.updatedAt),
      player1: score.player1?.username ?? '',
      player2: score.player2?.username ?? '',
      winner: score.winnerId ?? '',
      loser: score.loserId ?? '',
    }));
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
}

export async function deleteScore(id: string) {
  try {
    await prisma.score.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting score:', error);
    throw new Error('Failed to delete score.');
  }
}
