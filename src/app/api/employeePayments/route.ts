import { type PrismaClient, type EmployeePayment } from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const employeePayments: EmployeePayment[] =
      await db.employeePayment.findMany({
        include: {
          employee: true
        }
      })

    return new Response(JSONbig.stringify(employeePayments), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const data = await req.json()

  const newEmployeePayment = {
    amount: Number(data.amount),
    monthPayment: new Date(data.monthPayment as string),
    date: new Date(data.date as string),
    hoursWorked: data.hoursWorked ?? null
  }

  try {
    const employee = await db.employeePayment.create({
      data: {
        ...newEmployeePayment,
        employee: {
          connect: {
            id: Number(data.employeeId)
          }
        }
      },
      include: {
        employee: true
      }
    })
    return new Response(JSONbig.stringify(employee), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function PATCH(req: NextRequest): Promise<Response> {
  const data: EmployeePayment = await req.json()

  const newEmployeePayment = {
    amount: Number(data.amount),
    monthPayment: new Date(data.monthPayment),
    date: new Date(data.date),
    hoursWorked: data.hoursWorked ?? null
  }

  try {
    const employeePayment: EmployeePayment = await db.employeePayment.update({
      where: {
        id: Number(data.id)
      },
      data: newEmployeePayment,
      include: {
        employee: true
      }
    })
    return new Response(JSONbig.stringify(employeePayment), {
      status: 200
    })
  } catch (error) {
    console.log(error)

    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const data: { id: number } = await req.json()
  try {
    const employeePayment: EmployeePayment = await db.employeePayment.delete({
      where: {
        id: data.id
      }
    })

    return new Response(JSONbig.stringify(employeePayment), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response(JSONbig.stringify('Internal Server Error :('), {
      status: 500
    })
  }
}
