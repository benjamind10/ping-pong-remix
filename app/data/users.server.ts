import { prisma } from '~/data/database.server';

export async function getUserByUsername(username: string) {
    try {
        return await prisma.user.findUnique({
            where: { username },
        });
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Failed to fetch user');
    }
}

export async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error('Failed to fetch users');
    }
}

export async function getUserById(userId: string) {
    try {
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user by ID');
    }
}
