import { type BilledConsultation, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/ClubSalud/prisma'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const billedConsultations: BilledConsultation[] =
      await db.billedConsultation.findMany({
        include: {
          subscription: {
            include: {
              promotion: true,
              member: true
            }
          },
          plan: {
            include: {
              member: true,
              plan: true
            }
          }
        }
      })

    return new Response(JSONbig.stringify(billedConsultations), {
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
  const data = await req.json()

  const newPayment = {
    amount: Number(data.amount),
    autorizationNumber: String(data.autorizationNumber),
    date: data.date
  }

  try {
    const billedConsultation: BilledConsultation =
      await db.billedConsultation.create({
        data: {
          ...newPayment,
          plan: {
            connect: {
              id: Number(data.healthSubscribedPlanId)
            }
          },
          subscription: {
            connect: {
              id: Number(data.subscriptionId)
            }
          }
        },
        include: {
          plan: {
            include: {
              member: true
            }
          },
          subscription: {
            include: {
              promotion: true
            }
          }
        }
      })

    return new Response(JSONbig.stringify(billedConsultation), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const data = await req.json()
  try {
    const result = await db.billedConsultation.delete({
      where: { id: data }
    })

    return new Response(JSONbig.stringify(result), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
