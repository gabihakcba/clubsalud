import { type PrismaClient, type Promotion } from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import { type CreatePromotion } from 'utils/types'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const promotions: Promotion[] = await db.promotion.findMany({
    orderBy: { amountPrice: 'asc' }
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
    const parsed: CreatePromotion = {
      title: data.title,
      description: data.description,
      amountWeeklyClasses: Number(data.amountWeeklyClasses),
      amountPrice: Number(data.amountPrice)
    }
    const res: Promotion = await db.promotion.create({
      data: parsed
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data: Promotion = await req.json()
    const parsed: CreatePromotion = {
      title: data.title,
      description: data.description,
      amountWeeklyClasses: Number(data.amountWeeklyClasses),
      amountPrice: Number(data.amountPrice)
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
