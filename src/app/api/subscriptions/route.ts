import { type Subscription, type PrismaClient } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import moment from 'moment'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const subscriptions = await db.subscription.findMany({
      include: {
        member: {
          include: {
            memberSubscription: {
              include: {
                plan: true,
                promotion: true,
                billedConsultation: true,
                payment: true
              }
            }
          }
        },
        promotion: true,
        plan: true,
        billedConsultation: true,
        payment: true
      }
    })
    return new Response(JSONbig.stringify(subscriptions), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const id = data.id as number

    const action = req.nextUrl.searchParams.get('action')

    const subscription: Subscription | null = await db.subscription.findUnique({
      where: { id }
    })

    /**
     * If new subs is true, others must be false
     */
    if (action === 'active') {
      if (!subscription?.active) {
        const memberId = subscription?.memberId
        const member: any = await db.member.findUnique({
          where: { id: memberId },
          include: { memberSubscription: true }
        })
        member?.memberSubscription.forEach(async (subs: Subscription) => {
          await db.subscription.update({
            where: { id: subs.id },
            data: { active: false }
          })
        })
      }

      const updatedSubs = await db.subscription.update({
        where: { id },
        data: { active: !subscription?.active }
      })
      return new Response(JSON.stringify(updatedSubs), {
        status: 200
      })
    } else if (action === 'isByOS') {
      const oldIsByOS = subscription?.isByOS
      const updatedSubs = await db.subscription.update({
        where: { id },
        data: { isByOS: !oldIsByOS }
      })
      return new Response(JSON.stringify(updatedSubs), {
        status: 200
      })
    } else {
      return new Response('Invalid action', {
        status: 300
      })
    }
  } catch (error) {
    return new Response(JSON.stringify('Server error'), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const parsed = {
      date: data.date,
      paid: data.paid,
      remaining: data.remaining,
      total: data.total,
      initialDate: data.initialDate,
      expirationDate: data.expirationDate,
      remainingClasses: data.remainingClasses,
      active: true,
      isByOS: data.isByOS
    }

    const existingSubscription = await db.subscription.findFirst({
      where: {
        memberId: Number(data.memberId),
        date: {
          gte: moment(data.date as Date)
            .startOf('day')
            .toDate(),
          lte: moment(data.date as Date)
            .endOf('day')
            .toDate()
        }
      }
    })

    if (existingSubscription) {
      return new Response(
        JSON.stringify({
          message: 'Ya existe una suscripción para esta fecha'
        }),
        {
          status: 302
        }
      )
    }

    await db.subscription.updateMany({
      where: { active: true },
      data: { active: false }
    })

    const res: Subscription = await db.subscription.create({
      data: {
        ...parsed,
        promotion: {
          connect: {
            id: Number(data.promotionId)
          }
        },
        member: {
          connect: {
            id: Number(data.memberId)
          }
        },
        plan: {
          connect: {
            id: Number(data.planId)
          }
        }
      },
      include: {
        member: true,
        promotion: true,
        plan: true
      }
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

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const { id } = await req.json()

    const subscription = await db.subscription.delete({ where: { id } })

    return new Response(JSON.stringify(subscription), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify('Server error'), {
      status: 500
    })
  }
}
