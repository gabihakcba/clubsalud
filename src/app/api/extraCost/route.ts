import { type PrismaClient, type ExtraCost } from '@prisma/client'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const extraCost: ExtraCost[] = await db.extraCost.findMany()

    return new Response(JSON.stringify(extraCost), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const data: ExtraCost = await req.json()
  console.log(data)
  try {
    const newExtraCost: ExtraCost = await db.extraCost.create({ data })
    console.log(newExtraCost)
    return new Response(JSON.stringify(newExtraCost), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  const data: ExtraCost = await req.json()

  try {
    const extraCost: ExtraCost = await db.extraCost.update({
      where: {
        id: Number(data.id)
      },
      data: {
        ...data
      }
    })
    return new Response(JSON.stringify(extraCost), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const data: number = await req.json()
  try {
    const extraCost: ExtraCost = await db.extraCost.delete({
      where: {
        id: data
      }
    })

    return new Response(JSON.stringify(extraCost), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
