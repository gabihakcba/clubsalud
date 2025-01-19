import {
  type Attendance,
  type PrismaClient,
  type Subscription
} from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import { argDate, isSameDay } from 'utils/ClubSalud/dates'
import moment from 'moment'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams
  const date = searchParams.get('date')
  try {
    const attendances = await db.attendance.findMany({
      include: { class: true, member: true }
    })
    let ret
    if (date) {
      ret = attendances.filter((att) => {
        return (moment(date).isSame(att.date, 'day'))
      })
    } else {
      ret = attendances
    }
    return new Response(JSONbig.stringify(ret), {
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

    const today = argDate()

    const attendances = await db.attendance.findMany({
      where: {
        memberId: data.memberId,
        classId: data.classId
      }
    })

    const todayAttendances = attendances.filter((att: Attendance) =>
      isSameDay(att.date, today)
    )

    if (todayAttendances.length > 0) {
      return new Response(
        JSON.stringify(
          'Ya tiene una asistencia este dia, a esta clase, en este horario'
        ),
        {
          status: 300
        }
      )
    } else {
      const member = await db.member.findUnique({
        where: { id: data.memberId },
        include: { memberSubscription: true }
      })

      const subs = member?.memberSubscription

      if (subs) {
        const sub: Subscription = subs[subs?.length - 1]

        if (isSameDay(sub.expirationDate, argDate())) {
          await db.subscription.update({
            where: {
              id: sub.id
            },
            data: {
              active: false
            }
          })

          return new Response(JSON.stringify('Su suscripción ha vencido'), {
            status: 300
          })
        }

        const newRemaining = sub.remainingClasses - 1
        if (newRemaining < 0) {
          await db.subscription.update({
            where: {
              id: sub.id
            },
            data: {
              active: false
            }
          })

          return new Response(
            JSON.stringify('No tiene más clases disponibles'),
            {
              status: 300
            }
          )
        }

        const subUpdated = await db.subscription.update({
          where: {
            id: sub.id
          },
          data: {
            remainingClasses: newRemaining
          }
        })

        await db.attendance.create({
          data: {
            date: moment(data.date as Date).toDate(),
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

        return new Response(
          JSONbig.stringify(`Le quedan ${subUpdated.remainingClasses} clases`),
          {
            status: 200
          }
        )
      } else {
        return new Response(JSON.stringify('No tiene suscripciones vigentes'), {
          status: 300
        })
      }
    }
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

    return new Response('No se pudo editar la asistencia', {
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
