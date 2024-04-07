import { type NextRequest } from 'next/server'
import JSONbig from 'json-bigint'

// const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    // const class_: Class = await db.class.create({
    //   data: {
    //     name: 'Rehabilitación',
    //     duration: 1.0,
    //     days: [Days.FRIDAY, Days.SUNDAY],
    //     state: ClassState.ACTIVE
    //   }
    // })
    return new Response(JSONbig.stringify(''), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify('Server error'), {
      status: 500
    })
  }
}
