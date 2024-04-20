import { type InstructorPayment, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextResponse } from 'next/server'

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

export async function DELETE(req: NextResponse): Promise<Response> {
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

export async function POST(req: NextResponse): Promise<Response> {
  const body = await req.json()
  const newInstructorPayment = {
    amount: Number(body.amount),
    workedMonth: new Date(body.workedMonth as string),
    paymentDate: new Date(body.paymentDate as string),
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
