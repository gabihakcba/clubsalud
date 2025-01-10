import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(req: NextRequest, context: any): Promise<Response> {
  const id: number = Number(context.params.id)
  try {
    const res = await db.account.findFirst({
      where: {
        id
      },
      include: {
        memberAccount: true
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
