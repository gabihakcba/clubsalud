import { type Subscription, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const subscriptions = await db.subscription.findMany({
      include: {
        member: true,
        promotion: true
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
      remainingClasses: data.remainingClasses
    }

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
        }
      },
      include: {
        member: true,
        promotion: true
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
