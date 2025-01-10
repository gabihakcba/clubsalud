import {
  type PrismaClient,
  type HealthPlan,
  type HealthPlanRecord
} from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import { type CreateHealthPlan } from 'utils/ClubSalud/types'
import moment from 'moment'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const plan: HealthPlan[] = await db.healthPlan.findMany({
      include: { record: true }
    })
    return new Response(JSONbig.stringify(plan), {
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

    const [healthPlan, record] = await db.$transaction(async (db) => {
      const healthPlan: HealthPlan = await db.healthPlan.create({
        data: parsed
      })

      const record: HealthPlanRecord = await db.healthPlanRecord.create({
        data: {
          date: moment().toDate(),
          amount: Number(data.paymentPerConsultation),
          healthPlan: {
            connect: {
              id: healthPlan.id
            }
          }
        }
      })
      return [healthPlan, record]
    })

    return new Response(JSONbig.stringify({ healthPlan, record }), {
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
    const { id, ...info } = data

    const res: HealthPlan = await db.healthPlan.update({
      where: {
        id
      },
      data: {
        ...info
      }
    })

    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo actualizar la obra social', {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()

    const res: HealthPlan = await db.healthPlan.delete({
      where: {
        id: Number(data.id)
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo eliminar la obra social', {
      status: 400
    })
  }
}
