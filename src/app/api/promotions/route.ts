import {
  type PromotionRecord,
  type PrismaClient,
  type Promotion
} from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import moment from 'moment'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const promotions: Promotion[] = await db.promotion.findMany({
    orderBy: { amountPrice: 'asc' },
    include: { record: true }
  })
  return new Response(JSONbig.stringify(promotions), {
    status: 200
  })
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()
    const res: Promotion = await db.promotion.delete({
      where: {
        id: data.id
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo eliminar la oferta', {
      status: 400
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const parsed = {
      title: data.title,
      description: data.description,
      amountWeeklyClasses: Number(data.amountWeeklyClasses),
      amountPrice: Number(data.amountPrice)
    }

    const [promotion, record] = await db.$transaction(async (db) => {
      const promotion: Promotion = await db.promotion.create({
        data: parsed
      })

      const record: PromotionRecord = await db.promotionRecord.create({
        data: {
          date: moment().toDate(),
          price: Number(data.amountPrice),
          promotion: {
            connect: {
              id: promotion.id
            }
          }
        }
      })
      return [promotion, record]
    })

    return new Response(JSONbig.stringify({ promotion, record }), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data: Promotion = await req.json()
    const parsed = {
      title: data.title,
      description: data.description,
      amountWeeklyClasses: Number(data.amountWeeklyClasses)
    }
    const id: number = Number(data.id)
    const res: Promotion = await db.promotion.update({
      where: {
        id
      },
      data: parsed
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo editar la oferta', {
      status: 400
    })
  }
}
