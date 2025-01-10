import { type PrismaClient, type RegistrationForm } from '@prisma/client'
import prisma from 'utils/ClubSalud/prisma'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const forms = await db.registrationForm.findMany({
      include: {
        member: true,
        instructor: true
      }
    })
    return new Response(JSONbig.stringify(forms), {
      status: 200
    })
  } catch (error) {
    return new Response(JSONbig.stringify(error), {
      status: 500
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const data: RegistrationForm = await req.json()
    const { memberId, instructorId, id, ...parsed } = data

    const updatedForm = await db.registrationForm.update({
      where: { id },
      data: parsed
    })

    return new Response(JSON.stringify(updatedForm), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify('Server error'), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json()
    const { memberId, instructorId, ...parsed } = data
    console.log(parsed)
    const res: RegistrationForm = await db.registrationForm.create({
      data: {
        ...parsed,
        member: {
          connect: {
            id: Number(memberId)
          }
        },
        instructor: {
          connect: {
            id: Number(instructorId)
          }
        }
      },
      include: {
        member: true,
        instructor: true
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
    const { id } = await req.json()

    const registrationForm = await db.registrationForm.delete({ where: { id } })

    return new Response(JSON.stringify(registrationForm), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify('Server error'), {
      status: 500
    })
  }
}
