import {
  type Attendance,
  type PrismaClient,
  type Subscription
} from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import moment from 'moment'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const attendances = await db.attendance.findMany({
      include: { class: true, member: true }
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
    const today = new Date()

    const attendances = await db.attendance.findMany({
      where: {
        memberId: data.memberId,
        classId: data.classId
      }
    })

    const todayAttendances = attendances.filter((att: Attendance) =>
      moment(att.date).isSame(moment(today), 'day')
    )

    if (todayAttendances.length > 0) {
      return new Response(
        JSON.stringify({
          message:
            'Ya tiene una asistencia este dia, a esta clase, en este horario'
        }),
        {
          status: 300
        }
      )
    } else {
      const attendance: Attendance = await db.attendance.create({
        data: {
          date: today,
          class: {
            connect: {
              id: data.classId
            }
          },
          member: {
            connect: {
              id: data.memberId
            }
          }
        },
        include: {
          class: true,
          member: true
        }
      })

      const member = await db.member.findUnique({
        where: { id: data.memberId },
        include: { memberSubscription: true }
      })

      const subs = member?.memberSubscription

      if (subs) {
        const sub: Subscription = subs[subs?.length - 1]
        const newRemaining = sub.remaining - 1
        const subUpdated = await db.subscription.update({
          where: {
            id: sub.id
          },
          data: {
            remaining: newRemaining
          }
        })
        return new Response(
          JSONbig.stringify({ attendance, subscription: subUpdated }),
          {
            status: 200
          }
        )
      } else {
        return new Response(
          JSON.stringify({
            message: 'No tiene suscripciones vigentes'
          }),
          {
            status: 300
          }
        )
      }
    }
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()

    const res: Attendance = await db.attendance.update({
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

    return new Response('No se pudo editar la clase', {
      status: 400
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const res: Attendance = await db.attendance.delete({
      where: {
        id: data.id
      }
    })

    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    return new Response('No se pudo eliminar la clase', {
      status: 400
    })
  }
}
