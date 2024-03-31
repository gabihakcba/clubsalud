import { type PrismaClient } from '@prisma/client'
import { type NextApiRequest } from 'next'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(
  req: NextApiRequest,
  context: any
): Promise<Response> {
  const param = Number(context.params.name)

  try {
    if (isNaN(param)) {
      const name: string = context.params.name
      const res = await db.instructor.findFirstOrThrow({
        where: {
          name
        }
      })
      return new Response(JSONbig.stringify(res), {
        status: 200
      })
    } else {
      const id: number = param
      const res = await db.instructor.findFirstOrThrow({
        where: {
          id
        }
      })
      return new Response(JSONbig.stringify(res), {
        status: 200
      })
    }
  } catch (error) {
    return new Response(
      JSONbig.stringify('No isntructor with this id or name'),
      {
        status: 400
      }
    )
  }
}
