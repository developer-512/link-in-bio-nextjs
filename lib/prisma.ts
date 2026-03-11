// lib/prisma.ts
/*
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
export const prisma = new PrismaClient({ adapter });
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error'], // Optional: adds visibility during development
    })

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}*/
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;