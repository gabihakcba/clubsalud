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
    const res = await db.account.findFirstOrThrow({
      where: {
        username: un
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify('No user with this id'), {
      status: 400
    })
  }
}
