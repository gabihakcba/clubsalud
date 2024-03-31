import { PrismaClient, Schedule } from '@prisma/client'
import { NextRequest } from 'next/server'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

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
