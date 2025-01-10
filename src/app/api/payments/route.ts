import {
  type Payment,
  type PrismaClient,
  type Subscription,
  type Promotion
} from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/ClubSalud/prisma'
import { revalidatePath } from 'next/cache'

const db: PrismaClient = prisma

export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest): Promise<Response> {
  revalidatePath('api/schedules')
  try {
    const payments: Payment[] = await db.payment.findMany({
      include: {
        member: true,
        subscription: {
          include: {
            promotion: true
          }
        }
      }
    })

    return new Response(JSONbig.stringify(payments), {
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
    date: data.date
  }

  try {
    const payment: Payment = await db.payment.create({
      data: {
        ...newPayment,
        member: {
          connect: {
            id: Number(data.memberId)
          }
        },
        subscription: {
          connect: {
            id: Number(data.subscriptionId)
          }
        }
      },
      include: {
        member: true,
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

    return new Response(JSONbig.stringify(payment), {
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
    const payment: Payment & {
      subscription: Subscription & { promotion: Promotion }
    } = await db.payment.findFirstOrThrow({
      where: { id: data },
      include: {
        subscription: {
          include: {
            promotion: true
          }
        }
      }
    })

    if (!payment) {
      return new Response(JSONbig.stringify('No payment found'), {
        status: 300
      })
    }

    const subscriptionId = payment.subscriptionId
    const oldRemaining = payment.subscription.remaining
    const newRemaining = oldRemaining + payment.amount
    const paid = newRemaining <= 0

    const result = await db.$transaction([
      db.payment.delete({
        where: { id: data }
      }),

      db.subscription.update({
        where: { id: subscriptionId },
        data: { remaining: newRemaining, paid }
      })
    ])

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
