import { type PrismaClient, type HealthPlan } from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import { type CreateHealthPlan } from 'utils/types'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const members: HealthPlan[] = await db.healthPlan.findMany()
    return new Response(JSONbig.stringify(members), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data: CreateHealthPlan = await req.json()
    const parsed = {
      ...data,
      paymentPerConsultation: Number(data.paymentPerConsultation)
    }
    const res: HealthPlan = await db.healthPlan.create({
      data: parsed
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

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data: HealthPlan = await req.json()
    const id: number = Number(data.id)
    const res: HealthPlan = await db.healthPlan.update({
      where: {
        id
      },
      data: {
        ...data,
        paymentPerConsultation: Number(data.paymentPerConsultation)
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo crear el usuario', {
      status: 400
    })
  }
}
