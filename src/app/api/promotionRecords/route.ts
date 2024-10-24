import {
  type PrismaClient,
  type PromotionRecord,
  type Promotion
} from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import moment from 'moment'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const records: PromotionRecord[] = await db.promotionRecord.findMany({
      include: { promotion: true }
    })
    return new Response(JSONbig.stringify(records), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const { id, price } = data

    const [promotion, record] = await db.$transaction(async (db) => {
      const promotion: Promotion = await db.promotion.update({
        where: {
          id
        },
        data: {
          amountPrice: price
        }
      })

      const record: PromotionRecord = await db.promotionRecord.create({
        data: {
          date: moment().toDate(),
          price,
          promotion: {
            connect: {
              id
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

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const res: PromotionRecord = await db.promotionRecord.delete({
      where: {
        id: Number(data)
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo eliminar la entrada', {
      status: 400
    })
  }
}
