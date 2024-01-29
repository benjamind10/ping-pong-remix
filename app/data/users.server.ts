import { prisma } from '~/data/database.server';

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Failed to fetch user by ID');
  }
}
