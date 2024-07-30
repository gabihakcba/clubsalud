import { type InstructorPrice, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import { argDate } from 'utils/dates'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const prices = await db.instructorPrice.findMany({
      orderBy: { lastUpdate: 'desc' }
    })

    return new Response(JSONbig.stringify(prices), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    data.lastUpdate = argDate()
    const res: InstructorPrice = await db.instructorPrice.create({ data })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const id = await req.json()

    const oldPriceInstructor: InstructorPrice | null =
      await db.instructorPrice.findUnique({
        where: { id: Number(id) }
      })

    const lastActive: InstructorPrice | null =
      await db.instructorPrice.findFirst({
        where: { degree: oldPriceInstructor?.degree, active: true }
      })

    if (!oldPriceInstructor?.active && lastActive) {
      const lastActiveUpdated: InstructorPrice | null =
        await db.instructorPrice.update({
          where: { id: lastActive?.id },
          data: { active: false }
        })

      if (!lastActiveUpdated) {
        throw new Error('Error al actualizar')
      }
    }

    const newState: InstructorPrice = await db.instructorPrice.update({
      where: { id: Number(id) },
      data: {
        active: !oldPriceInstructor?.active
      }
    })

    return new Response(JSONbig.stringify(newState), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const id = await req.json()
  try {
    const prices = await db.instructorPrice.delete({
      where: { id }
    })

    return new Response(JSONbig.stringify(prices), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}
