import { type Schedule, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const schedules: Schedule[] = await db.schedule.findMany({
      orderBy: [
        {
          start: 'asc'
        },
        {
          day: 'asc'
        }
      ],
      include: {
        class: true,
        charge: true
      }
    })
    return new Response(JSONbig.stringify(schedules), {
      status: 200,
      headers: {
        'Cache-control': 'no-cache'
      }
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
