import { type PrismaClient } from '@prisma/client'
import { type NextApiRequest } from 'next'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(
  req: NextApiRequest,
  context: any
): Promise<Response> {
  const id: number = Number(context.params.id)

  try {
    const acc: { id: number } | null = await db.member.findFirst({
      where: {
        accountId: id
      }
    })
    return new Response(JSONbig.stringify(acc), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
