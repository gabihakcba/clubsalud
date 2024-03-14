import { type PrismaClient, type Account } from '@prisma/client'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const res: Account = await db.account.create({
      data: {
        username: 'gabi',
        password: 'pollo',
        permissions: 'OWN'
      }
    })
    // const res = await db.account.deleteMany()
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify('Server error'), {
      status: 500
    })
  }
}
