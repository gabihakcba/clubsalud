// import { PrismaClient } from '@prisma/client'

// let prisma: PrismaClient = new PrismaClient()

// if (process.env.NODE_ENV === 'production') {
//   // In production, use a singleton instance to avoid creating multiple connections
//   prisma = prisma || new PrismaClient()
// } else {
//   // In development, create a new instance for each request
//   prisma = new PrismaClient()
// }

// export default

import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = global.prisma || new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

// Cleanup function for closing the Prisma Client connection
export const cleanupPrisma = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect()
  }
}
