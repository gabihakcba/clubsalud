import { type Schedule, type PrismaClient } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

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

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const id: number = await req.json()
    const schedule: Schedule = await db.schedule.update({
      where: {
        id
      },
      data: {
        classId: null,
        instructorInCharge: null,
        instructorSubstitute: null
      },
      include: {
        class: true,
        charge: true
      }
    })
    return new Response(JSONbig.stringify(schedule), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 499
    })
  }
}
