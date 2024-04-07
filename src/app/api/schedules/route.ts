import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const schedules = await db.schedule.findMany({
      orderBy: [
        {
          start: 'asc'
        },
        {
          day: 'asc'
        }
      ]
    })
    return new Response(JSONbig.stringify(schedules), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
