import { prisma } from '~/data/database.server';
import { hash } from 'bcrypt';
import { UserExistsError } from '~/data/customError.server'; // Adjust the path as needed

interface SignupCredentials {
    email: string;
    password: string;
    username: string;
}

export async function signup({ email, password, username }: SignupCredentials) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new UserExistsError(
                'A user with this email already exists.',
                422
            );
        }

        // Hash the password and create the user
        const passwordHash = await hash(password, 12);
        const user = await prisma.user.create({
            data: { email, password: passwordHash, username },
        });

        return {
            userId: user.id,
            redirectPath: '/',
        };
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
}
