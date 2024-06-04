import { type InstructorPrice, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import { type CreateInstructorPrice } from 'utils/types'
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
    const data: CreateInstructorPrice = await req.json()
    data.lastUpdate = new Date('07/04/2024')
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
    const data: InstructorPrice = await req.json()

    const prevPrice = await db.instructorPrice.findFirst({
      where: { degree: data.degree },
      orderBy: { lastUpdate: 'asc' }
    })

    let date: Date = data.lastUpdate

    if (prevPrice?.amount !== data.amount) {
      date = new Date()
    }

    const res: InstructorPrice = await db.instructorPrice.update({
      where: { id: data.id },
      data: { amount: data.amount, lastUpdate: date }
    })

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
