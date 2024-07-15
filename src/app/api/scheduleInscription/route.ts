import { type ScheduleInscription, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const url = req.nextUrl
    const params = url.searchParams.get('id')
    let inscriptions: ScheduleInscription[]

    if (params) {
      inscriptions = await db.scheduleInscription.findMany({
        where: { scheduleId: Number(params) },
        include: { member: true, schedule: true }
      })
    } else {
      inscriptions = await db.scheduleInscription.findMany({
        include: { member: true, schedule: true }
      })
    }

    return new Response(JSONbig.stringify(inscriptions), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const inscription: ScheduleInscription =
      await db.scheduleInscription.create({ data })

    return new Response(JSONbig.stringify(inscription), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const inscriptionId = Number(data)

    const deleted = await db.scheduleInscription.delete({
      where: { id: inscriptionId }
    })

    return new Response(JSONbig.stringify(deleted), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
