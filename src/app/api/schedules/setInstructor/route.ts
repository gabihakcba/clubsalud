import { type PrismaClient, type Schedule } from '@prisma/client'
import { type NextRequest } from 'next/server'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const body: { data: { instructorId: string; scheduleId: number } } =
      await req.json()
    const schedule: Schedule = await db.schedule.update({
      where: {
        id: body.data.scheduleId
      },
      data: {
        instructorInCharge: Number(body.data.instructorId)
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
