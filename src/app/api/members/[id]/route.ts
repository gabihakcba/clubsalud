import { type PrismaClient } from '@prisma/client'
import { type NextApiRequest } from 'next'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(
  req: NextApiRequest,
  context: any
): Promise<Response> {
  const id: number = Number(context.params.id)

  try {
    const acc: { id: number } | null = await db.member.findFirstOrThrow({
      where: {
        accountId: id
      }
    })
    return new Response(JSON.stringify(acc), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500
    })
  }
}
