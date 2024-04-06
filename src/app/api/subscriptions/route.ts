import { Subscription, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const suscriptions = await db.member.findMany({
      include: {
        memberSubscription: true
      }
    })
    return new Response(
      JSONbig.stringify(
        suscriptions.filter((member) => member.memberSubscription.length > 0)
      ),
      {
        status: 200
      }
    )
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
      remaining: parseFloat(data.remaining),
      total: parseFloat(data.total)
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
