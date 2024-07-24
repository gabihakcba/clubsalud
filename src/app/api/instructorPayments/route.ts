import { type InstructorPayment, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import { argString2Date } from 'utils/dates'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const instructorPayments: InstructorPayment[] =
      await db.instructorPayment.findMany({
        include: { instructor: true }
      })
    return new Response(JSONbig.stringify(instructorPayments), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const id = await req.json()
  try {
    const instructorPayment: InstructorPayment =
      await db.instructorPayment.delete({
        where: { id },
        include: { instructor: true }
      })
    return new Response(JSONbig.stringify(instructorPayment), {
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
  const body = await req.json()
  const newInstructorPayment = {
    amount: Number(body.amount),
    workedMonth: argString2Date(body.workedMonth as string),
    paymentDate: argString2Date(body.paymentDate as string),
    workedHours: Number(body.workedHours),
    /**
     * TODO: change this
     */
    scheduledHours: 0,
    pricePerHoour: 2
  }
  try {
    const instructorPayment: InstructorPayment =
      await db.instructorPayment.create({
        data: {
          ...newInstructorPayment,
          instructor: {
            connect: {
              id: Number(body.instructorId)
            }
          }
        },
        include: {
          instructor: true
        }
      })
    return new Response(JSONbig.stringify(instructorPayment), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}
