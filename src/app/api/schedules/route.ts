import { type Schedule, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

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

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const body: { data: { classId: string; scheduleId: number } } =
      await req.json()
    const schedule: Schedule = await db.schedule.update({
      where: {
        id: body.data.scheduleId
      },
      data: {
        classId: Number(body.data.classId)
      }
    })
    return new Response(JSONbig.stringify(schedule), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
