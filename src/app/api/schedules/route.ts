import { type Schedule, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { revalidatePath } from 'next/cache'

const db: PrismaClient = prisma

export const fetchCache = 'force-no-store'

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

    revalidatePath('api/schedules')
    return new Response(JSONbig.stringify(schedules), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
