import { type Class, ClassState, Days, type PrismaClient } from '@prisma/client'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'
import JSONbig from 'json-bigint'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const class_: Class = await db.class.create({
      data: {
        name: 'Rehabilitación',
        duration: 1.0,
        days: [Days.FRIDAY, Days.SUNDAY],
        state: ClassState.ACTIVE
      }
    })
    return new Response(JSONbig.stringify(class_), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify('Server error'), {
      status: 500
    })
  }
}
