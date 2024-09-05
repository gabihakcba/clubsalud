import { type Class, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import { type Class_, type CreateClass_ } from 'utils/types'

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
    const data: CreateClass_ = await req.json()
    const parsed = {
      name: data.name,
      duration: parseFloat(String(data.duration))
    }
    const class_: Class = await db.class.create({ data: parsed })
    return new Response(JSONbig.stringify(class_), {
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
    const data: Class_ = await req.json()
    const id: number = Number(data.id)
    const parsed: Class = {
      id,
      name: data.name,
      duration: parseFloat(String(data.duration))
    }
    const res: Class_ = await db.class.update({
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
    return new Response('No se pudo editar la clase', {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()
    const res: Class_ = await db.class.delete({
      where: {
        id: data.id
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response('No se pudo eliminar la clase', {
      status: 400
    })
  }
}
