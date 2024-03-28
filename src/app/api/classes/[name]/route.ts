import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextApiRequest } from 'next'

const db: PrismaClient = prisma

export async function GET(
  req: NextApiRequest,
  context: any
): Promise<Response> {
  const param = Number(context.params.name)

  try {
    if (isNaN(param)) {
      const name: string = context.params.name
      const res = await db.class.findFirstOrThrow({
        where: {
          name
        }
      })
      return new Response(JSONbig.stringify(res), {
        status: 200
      })
    } else {
      const id: number = param
      const res = await db.class.findFirstOrThrow({
        where: {
          id
        }
      })
      return new Response(JSONbig.stringify(res), {
        status: 200
      })
    }
  } catch (error) {
    return new Response(JSONbig.stringify('No class with this id or name'), {
      status: 400
    })
  }
}
