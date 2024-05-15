import {
  type BilledConsultation,
  type PrismaClient,
  type Subscription
} from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'

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
    date: new Date()
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

    const subscription: Subscription | null = await db.subscription.findUnique({
      where: {
        id: Number(data.subscriptionId)
      }
    })

    const oldRemaining = subscription?.remaining ?? 0
    const newRemaining = oldRemaining - Number(data.amount)
    const isNotPaid = newRemaining > 0

    await db.subscription.update({
      where: {
        id: Number(data.subscriptionId)
      },
      data: {
        remaining: { decrement: Number(data.amount) },
        paid: !isNotPaid
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
