import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, use a singleton instance to avoid creating multiple connections
  prisma = prisma || new PrismaClient();
} else {
  // In development, create a new instance for each request
  prisma = new PrismaClient();
}

export default prisma;

// Cleanup function for closing the Prisma Client connection
export const cleanupPrisma = async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
};