import {
  type AttendanceInstructor,
  type PrismaClient
} from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const attendances = await db.attendanceInstructor.findMany({
      include: { class: true, instructor: true }
    })
    return new Response(JSONbig.stringify(attendances), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const attendance: AttendanceInstructor =
      await db.attendanceInstructor.create({
        data: {
          date: data.date,
          hours: data.hours,
          class: {
            connect: {
              id: data.classId
            }
          },
          instructor: {
            connect: {
              id: data.instructorId
            }
          }
        },
        include: {
          class: true,
          instructor: true
        }
      })

    return new Response(JSONbig.stringify(attendance), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const res = await db.attendanceInstructor.update({
      where: {
        id: data.id
      },
      data
    })

    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response('No se pudo editar la asistencia', {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const id = await req.json()

    const res = await db.attendanceInstructor.delete({
      where: {
        id
      }
    })

    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response('No se pudo eliminar la asistencia', {
      status: 400
    })
  }
}
