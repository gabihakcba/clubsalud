import { type PrismaClient } from '@prisma/client'
import { type NextApiRequest } from 'next'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(
  req: NextApiRequest,
  context: any
): Promise<Response> {
  const un: string = context.params.un

  try {
    const acc: { id: number } | null = await db.account.findFirstOrThrow({
      select: {
        id: true
      },
      where: {
        username: un
      }
    })
    return new Response(JSONbig.stringify(acc), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
