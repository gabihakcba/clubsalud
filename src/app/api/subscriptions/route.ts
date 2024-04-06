import { Subscription, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { NextRequest } from 'next/server'
import { CreateSubscription } from 'utils/types'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const suscriptions = await db.subscription.findMany()
    return new Response(JSONbig.stringify(suscriptions), {
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
      paid: Boolean(data.paid),
      remaining: parseFloat(data.remaining)
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
