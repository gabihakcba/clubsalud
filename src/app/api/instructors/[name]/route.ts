import { type PrismaClient } from '@prisma/client'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(req: NextRequest, context: any): Promise<Response> {
  const param = Number(context.params.name)

  try {
    if (isNaN(param)) {
      const name: string = context.params.name
      const res = await db.instructor.findFirstOrThrow({
        where: {
          name
        },
        include: {
          instructorPayments: true,
          attendanceInstructor: true
        }
      })
      return new Response(JSONbig.stringify(res), {
        status: 200
      })
    } else {
      const id: number = param
      const res = await db.instructor.findFirstOrThrow({
        where: {
          id
        }
      })
      return new Response(JSONbig.stringify(res), {
        status: 200
      })
    }
  } catch (error) {
    console.log(error)
    return new Response(
      JSONbig.stringify('No isntructor with this id or name'),
      {
        status: 400
      }
    )
  }
}
