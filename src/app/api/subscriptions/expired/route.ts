import { type Subscription, type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { revalidatePath } from 'next/cache'
import { argDate, diffDate } from 'utils/dates'

const db: PrismaClient = prisma

export const fetchCache = 'force-no-store'

export async function GET(): Promise<Response> {
  const today = argDate()
  try {
    const members = await db.member.findMany({
      include: { memberSubscription: { include: { promotion: true } } }
    })
    members.forEach((mem: any) => {
      mem?.memberSubscription?.sort(
        (sub1: Subscription, sub2: Subscription) => {
          if (sub1.active) {
            return -1
          } else if (sub2.active) {
            return 1
          } else {
            const sub1diff = diffDate(today, sub1.expirationDate)
            const sub2diff = diffDate(today, sub2.expirationDate)
            return sub1diff - sub2diff
          }
        }
      )
    })

    const memberWith = members.filter(
      (mem: any) => mem.memberSubscription?.length > 0
    )

    revalidatePath('api/subscriptions')
    return new Response(JSONbig.stringify(memberWith), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify('Internal server error :('), {
      status: 500
    })
  }
}
