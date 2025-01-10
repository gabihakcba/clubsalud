import { type HealthPlanSubscribed, type PrismaClient } from '@prisma/client'
import { type NextRequest } from 'next/server'
import prisma from 'utils/ClubSalud/prisma'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const res: HealthPlanSubscribed[] = await db.healthPlanSubscribed.findMany({
      include: { member: true, plan: true }
    })
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 400
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const res: HealthPlanSubscribed = await db.healthPlanSubscribed.create({
      data
    })
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()
    const res: HealthPlanSubscribed = await db.healthPlanSubscribed.delete({
      where: {
        id: Number(data.id)
      }
    })
    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo eliminar la obra social', {
      status: 400
    })
  }
}
export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const { id, afiliateNumber } = await req.json()
    const res: HealthPlanSubscribed = await db.healthPlanSubscribed.update({
      where: {
        id: Number(id)
      },
      data: { afiliateNumber }
    })

    return new Response(JSON.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo actualizar la obra social', {
      status: 400
    })
  }
}
