import { type Class, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import { type CreateClass } from 'utils/types'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const classes = await db.class.findMany()
    return new Response(JSONbig.stringify(classes), {
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
    const data: CreateClass = await req.json()
    const class_: Class = await db.class.create({ data })
    return new Response(JSONbig.stringify(class_), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}
