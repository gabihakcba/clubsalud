import { type PrismaClient, MemberState, type Prisma } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'
import moment from 'moment'
import { argDate } from 'utils/ClubSalud/dates'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    type MemberWithAttendance = Prisma.MemberGetPayload<{
      include: { memberAttendance: true }
    }>

    const members: MemberWithAttendance[] = await db.member.findMany({
      include: { memberAttendance: true }
    })

    const inactiveMembers = members.filter(
      (member) =>
        member.memberAttendance.filter((attendance) => {
          const attendaceDate = moment(attendance.date)
          const currentDate = argDate()
          return (
            attendaceDate.isSame(currentDate, 'month') &&
            attendaceDate.isSame(currentDate, 'month')
          )
        }).length === 0
    )
    const idsInactives = inactiveMembers.map((member) => member.id)
    await db.member.updateMany({
      where: { id: { in: idsInactives } },
      data: { state: MemberState.INACTIVE }
    })

    const activeMembers = members.filter(
      (member) =>
        member.memberAttendance.filter((attendance) => {
          const attendaceDate = moment(attendance.date)
          const currentDate = argDate()
          return (
            attendaceDate.isSame(currentDate, 'month') &&
            attendaceDate.isSame(currentDate, 'month')
          )
        }).length > 0
    )
    const idsActives = activeMembers.map((member) => member.id)
    await db.member.updateMany({
      where: { id: { in: idsActives } },
      data: { state: MemberState.ACTIVE }
    })

    const response = {
      inactives: inactiveMembers,
      actives: activeMembers
    }
    return new Response(JSONbig.stringify(response), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
