import {
  type PrismaClient,
  type HealthPlan,
  type HealthPlanRecord
} from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import moment from 'moment'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const records: HealthPlanRecord[] = await db.healthPlanRecord.findMany({
      include: { healthPlan: true }
    })
    return new Response(JSONbig.stringify(records), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const { id, price } = data

    const [healthPlan, record] = await db.$transaction(async (db) => {
      const healthPlan: HealthPlan = await db.healthPlan.update({
        where: {
          id
        },
        data: {
          paymentPerConsultation: price
        }
      })

      const record: HealthPlanRecord = await db.healthPlanRecord.create({
        data: {
          date: moment().toDate(),
          amount: price,
          healthPlan: {
            connect: {
              id
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

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const res: HealthPlanRecord = await db.healthPlanRecord.delete({
      where: {
        id: Number(data)
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
