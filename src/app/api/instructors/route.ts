import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'
import { type CreateInstructor, type Instructor } from 'utils/types'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  try {
    let instructors: Instructor[] | Instructor
    if (id) {
      instructors = await db.instructor.findMany({
        where: { id: Number(id) },
        include: {
          instructorPayments: true,
          attendanceInstructor: { include: { class: true } }
        }
      })
    } else {
      instructors = await db.instructor.findMany({
        include: {
          instructorPayments: true,
          attendanceInstructor: { include: { class: true } }
        }
      })
    }
    return new Response(JSONbig.stringify(instructors), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 400
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data: CreateInstructor = await req.json()
    const parsed = {
      name: data.name,
      lastName: data.lastName,
      dni: BigInt(data.dni),
      cuit: data?.cuit ? BigInt(data.cuit) : undefined,
      phoneNumber: BigInt(data.phoneNumber),
      address: data.address,
      email: data.email,
      degree: data.degree,
      cbu: data?.cbu,
      alias: data?.alias ? data.alias : null
    }
    const res: Instructor = await db.instructor.create({
      data: {
        ...parsed,
        account: {
          connect: {
            id: data.accountId
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

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data: { id: number } = await req.json()
    const res: Instructor = await db.instructor.delete({
      where: {
        id: data.id
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo eliminar el usuario', {
      status: 400
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data: Instructor = await req.json()
    const parsed = {
      name: data.name,
      lastName: data.lastName,
      dni: BigInt(data.dni),
      cuit: data?.cuit ? BigInt(data.cuit) : undefined,
      phoneNumber: BigInt(data.phoneNumber),
      address: data.address,
      email: data.email,
      degree: data.degree,
      cbu: data?.cbu,
      alias: data?.alias
    }
    const id: number = Number(data.id)
    const res: Instructor = await db.instructor.update({
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
    return new Response('No se pudo crear el usuario', {
      status: 400
    })
  }
}
