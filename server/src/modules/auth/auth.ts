import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from 'generated/prisma';
import { jwt } from 'better-auth/plugins/jwt';
import { betterAuth } from 'better-auth';

const ONE_WEEK_TO_EXPIRES_IN = 60 * 60 * 24 * 7; // 1 week
const ONE_DAY = 60 * 60 * 24; // 1 day

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  // JWT Session
  session: {
    expiresIn: ONE_WEEK_TO_EXPIRES_IN,
  },

  // Email And Password
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  user: {
    modelName: 'User',
    fields: {
      name: 'name',
      email: 'email',
      image: 'image',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      emailVerified: 'emailVerified',
    },
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
        input: true,
      },
    },
  },

  // Plugins
  plugins: [
    jwt({
      jwt: {
        expirationTime: ONE_DAY,
      },
    }),
  ],

  // Secrets Envs
  secret: process.env.BETTER_AUTH_SECRET ?? 'change_this_secret',
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000/api/auth',
});

export type Session = typeof auth.$Infer.Session;
