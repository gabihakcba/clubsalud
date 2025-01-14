import { type Plan, type PrismaClient } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/ClubSalud/prisma'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const plan: Plan[] = await db.plan.findMany()
    return new Response(JSONbig.stringify(plan), {
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
  try {
    const plan: Plan = await db.plan.create({
      data: {
        ...data
      }
    })
    return new Response(JSONbig.stringify(plan), {
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
  try {
    const data = await req.json()
    const plan: Plan = await db.plan.delete({
      where: {
        id: data
      }
    })
    return new Response(JSONbig.stringify(plan), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo eliminar el plan', {
      status: 400
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const fields = await req.json()
    const plan: Plan = await db.plan.update({
      where: {
        id: fields.id
      },
      data: fields
    })
    return new Response(JSONbig.stringify(plan), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response('No se pudo modificar el plan', {
      status: 400
    })
  }
}
