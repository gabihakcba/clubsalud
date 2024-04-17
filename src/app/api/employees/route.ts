import {
  ContractType,
  type Employee,
  JobPosition,
  type PrismaClient
} from '@prisma/client'
import JSONbig from 'json-bigint'
import { type NextRequest } from 'next/server'
import prisma from 'utils/prisma'

const db: PrismaClient = prisma

export async function GET(): Promise<Response> {
  try {
    const employees: Employee[] = await db.employee.findMany({
      include: {
        account: true,
        payment: true
      }
    })

    return new Response(JSONbig.stringify(employees), {
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

  const newEmployee = {
    name: String(data.name),
    lastName: String(data.lastName),
    dni: BigInt(Number(data.dni)),
    cuit: data.cuit ? BigInt(Number(data.cuit)) : null,
    phoneNumber: BigInt(Number(data.phoneNumber)),
    email: String(data.email),
    position: JobPosition[data.position],
    contractType: ContractType[data.contractType],
    salary: parseFloat(data.salary as string)
  }

  try {
    let employee: Employee | null = null
    if (data.accountId) {
      employee = await db.employee.create({
        data: {
          ...newEmployee,
          account: {
            connect: {
              id: Number(data.accountId)
            }
          }
        },
        include: {
          account: true
        }
      })
    } else {
      employee = await db.employee.create({
        data: {
          ...newEmployee
        }
      })
    }
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
  const data: Employee = await req.json()
  const newEmployee = {
    name: data.name,
    lastName: data.lastName,
    dni: data.dni,
    cuit: data.cuit ? data.cuit : null,
    email: data.email,
    phoneNumber: data.phoneNumber,
    position: JobPosition[data.position],
    contractType: ContractType[data.contractType],
    salary: data.salary,
    lastSalaryUpdate: data.lastSalaryUpdate
  }

  try {
    const employee: Employee = await db.employee.update({
      where: {
        id: Number(data.id)
      },
      data: {
        ...newEmployee
      },
      include: {
        account: true,
        payment: true
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

export async function DELETE(req: NextRequest): Promise<Response> {
  const data: number = await req.json()
  try {
    const employee: Employee = await db.employee.delete({
      where: {
        id: data
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
