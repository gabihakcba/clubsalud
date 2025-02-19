import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(req: NextRequest, context: any): Promise<Response> {
  const id: number = Number(context.params.id)

  try {
    const acc: { id: number } | null = await db.member.findFirst({
      where: {
        id
      },
      include: {
        planSubscribed: {
          include: { plan: true }
        }
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
