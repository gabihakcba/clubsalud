import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(req: NextRequest, context: any): Promise<Response> {
  const pathId: string = context.params.id
  const id = Number(pathId)
  try {
    const res = await db.account.findFirstOrThrow({
      where: {
        id
      },
      include: {
        notificationSender: true,
        notifiactionReceiver: true,
        instructorAccount: {
          include: {
            scheduleInCharge: {
              include: {
                class: true,
                scheduleInscription: { include: { member: true } }
              }
            }
          }
        },
        memberAccount: {
          include: {
            planSubscribed: { include: { plan: true } },
            memberSubscription: { include: { promotion: true } },
            scheduleInscription: {
              include: {
                schedule: { include: { charge: true, class: true } },
                member: true
              }
            },
            registrationForm: true,
            followUpForm: true
          }
        },
        employeeAccount: true
      }
    })
    return new Response(JSONbig.stringify(res), {
      status: 200
    })
  } catch (error) {
    console.log('API/ACCOUNT/ID')
    console.log(error)
    return new Response(JSONbig.stringify('No user with this id'), {
      status: 400
    })
  }
}
