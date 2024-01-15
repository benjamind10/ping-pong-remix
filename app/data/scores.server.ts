import { Score } from '~/types';
import { prisma } from '~/data/database.server';

export async function getStoredScores() {
  try {
    return await prisma.score.findMany();
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error; // Rethrow the error or handle it as needed
  }
}

export async function deleteScore(id: string) {
  try {
    await prisma.score.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete score.');
  }
}

export async function storeScores(scoreData: Score) {
  try {
    return await prisma.score.create({
      data: {
        ...scoreData,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding score:', error.message);
      throw new Error(`Failed to add score: ${error.message}`);
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('Failed to add score: An unexpected error occurred');
    }
  }
}

export async function updateScore(id: string, scoreData: Score) {
  try {
    await prisma.score.update({
      where: { id },
      data: {
        ...scoreData,
      },
    });
  } catch (error) {
    throw new Error('Failed to update score.');
  }
}
