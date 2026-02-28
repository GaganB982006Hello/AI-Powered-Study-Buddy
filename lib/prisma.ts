import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
        // @ts-ignore - datasourceUrl is preferred in Prisma 7
        datasourceUrl: process.env.DATABASE_URL,
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
