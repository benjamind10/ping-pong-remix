import { prisma } from '~/data/database.server';
import { compare, hash } from 'bcrypt';
import {
  UserExistsError,
  AuthenticationError,
} from '~/data/customError.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

interface SignupCredentials {
  email: string;
  password: string;
  username: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set');
}
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  const cookie = await sessionStorage.commitSession(session);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}

export async function signup({ email, password, username }: SignupCredentials) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new UserExistsError('A user with this email already exists.', 422);
    }

    // Hash the password and create the user
    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: passwordHash, username },
    });

    return createUserSession(user.id, '/scores');
  } catch (error) {
    console.error('Signup Error:', error);
    throw error;
  }
}

export async function login({ email, password }: LoginCredentials) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AuthenticationError('Invalid email or password', 401);
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new AuthenticationError('Invalid email or password', 401);
    }

    return createUserSession(user.id, '/scores');
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
}
