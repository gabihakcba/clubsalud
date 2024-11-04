import {
  type Instructor,
  type Account,
  type Member,
  type PrismaClient,
  type InstructorPayment,
  type Employee,
  type EmployeePayment,
  type Payment,
  type BilledConsultation
} from '@prisma/client'
import ExcelJS from 'exceljs'
import prisma from 'utils/prisma'
import { type NextRequest } from 'next/server'

const db: PrismaClient = prisma

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const accounts = await db.account.findMany()
    const members = await db.member.findMany()
    const instructors = await db.instructor.findMany()
    const employees = await db.employee.findMany()
    const instructorPayment = await db.instructorPayment.findMany()
    const employeePayment = await db.employeePayment.findMany()
    const payments = await db.payment.findMany()
    const billedConsultation = await db.billedConsultation.findMany()
    const subsciptions = await db.subscription.findMany()

    const workbook = new ExcelJS.Workbook()
    const accountsSheet = workbook.addWorksheet('Cuentas')
    const membersSheet = workbook.addWorksheet('Alumnos')
    const instructorsSheet = workbook.addWorksheet('Profesores')
    const employeesSheet = workbook.addWorksheet('Empleados')
    const instructorPaymentSheet = workbook.addWorksheet('Pago Profesores')
    const employeePaymentSheet = workbook.addWorksheet('Pago empleados')
    const paymentsSheet = workbook.addWorksheet('Cobros')
    const billedConsultationSheet = workbook.addWorksheet('Consultas cobradas')

    accountsSheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Nombre de usuario', key: 'username', width: 30 },
      { header: 'Permisos', key: 'permissions[0]' }
    ]

    accounts.forEach((account: Account, index: number) => {
      accountsSheet.addRow({
        id: account.id,
        username: account.username
      })
      // Definir un nombre único para cada cuenta (por ejemplo, "Account_X")
      // const accountDefinedName = `Account_${account.id}`
      // workbook.definedNames.add(accountDefinedName, `Cuentas!A${index + 2}`)
    })

    membersSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Apellido', key: 'lastName', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Cuit', key: 'cuit', width: 30 },
      { header: 'Número de teléfono', key: 'phoneNumber', width: 30 },
      { header: 'Dirección', key: 'address', width: 30 },
      { header: 'Fecha de inscripción', key: 'inscriptionDate', width: 30 },
      { header: 'Historia clínica (ID)', key: 'afiliateNumber', width: 30 },
      { header: 'Account Username (link)', key: 'accountId', width: 30 }
    ]

    members.forEach((member: Member) => {
      const row = membersSheet.addRow({
        id: member.id,
        name: member.name,
        lastName: member.lastName,
        dni: member.dni.toString(),
        cuit: member.cuit?.toString(),
        phoneNumber: member.phoneNumber.toString(),
        address: member.address,
        inscriptionDate: member.inscriptionDate,
        afiliateNumber: member.afiliateNumber.toString()
      })

      const accountRowIndex =
        accounts.findIndex((account) => account.id === member.accountId) + 2

      if (accountRowIndex > 1) {
        const account = accounts.find(
          (account) => account.id === member.accountId
        )

        const accountDefinedName = `Account_${account?.id}`
        row.getCell('accountId').value = {
          text: account?.username ?? '',
          hyperlink: `#${accountDefinedName}`
        }
      } else {
        row.getCell('accountId').value = 'Account not found'
      }
    })

    instructorsSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Apellido', key: 'lastName', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Cuit', key: 'cuit', width: 30 },
      { header: 'Número de teléfono', key: 'phoneNumber', width: 30 },
      { header: 'Dirección', key: 'address', width: 30 },
      { header: 'E-mail', key: 'email', width: 30 },
      { header: 'Título', key: 'degree', width: 30 },
      { header: 'CBU', key: 'cbu', width: 30 },
      { header: 'Alias', key: 'alias', width: 30 },
      { header: 'Account Username (link)', key: 'accountId', width: 30 }
    ]

    instructors.forEach((instructor: Instructor) => {
      const row = instructorsSheet.addRow({
        id: instructor.id,
        name: instructor.name,
        lastName: instructor.lastName,
        dni: instructor.dni.toString(),
        cuit: instructor.cuit?.toString(),
        phoneNumber: instructor.phoneNumber.toString(),
        address: instructor.address,
        email: instructor.email,
        degree: instructor.degree,
        cbu: instructor.cbu?.toString(),
        alias: instructor.alias
      })

      const accountRowIndex =
        accounts.findIndex((account) => account.id === instructor.accountId) + 2

      if (accountRowIndex > 1) {
        const username =
          accounts.find((account) => account.id === instructor.accountId)
            ?.username ?? ''
        const hyperlink = encodeURI(`'Cuentas'!A${accountRowIndex}`)
        row.getCell('accountId').value = {
          text: username,
          hyperlink
        }
      } else {
        row.getCell('accountId').value = 'Account not found'
      }
    })

    employeesSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Apellido', key: 'lastName', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Cuit', key: 'cuit', width: 30 },
      { header: 'Número de teléfono', key: 'phoneNumber', width: 30 },
      { header: 'E-mail', key: 'email', width: 30 },
      { header: 'CBU', key: 'cbu', width: 30 },
      { header: 'Alias', key: 'alias', width: 30 },
      { header: 'Account Username (link)', key: 'accountId', width: 30 }
    ]

    employees.forEach((employee: Employee) => {
      const row = employeesSheet.addRow({
        id: employee.id,
        name: employee.name,
        lastName: employee.lastName,
        dni: employee.dni.toString(),
        cuit: employee.cuit?.toString(),
        phoneNumber: employee.phoneNumber.toString(),
        email: employee.email,
        cbu: employee.cbu?.toString(),
        alias: employee.alias
      })

      const accountRowIndex =
        accounts.findIndex((account) => account.id === employee.accountId) + 2

      if (accountRowIndex > 1) {
        const username =
          accounts.find((account) => account.id === employee.accountId)
            ?.username ?? ''
        const hyperlink = encodeURI(`'Cuentas'!A${accountRowIndex}`)
        row.getCell('accountId').value = {
          text: username,
          hyperlink
        }
      } else {
        row.getCell('accountId').value = 'Account not found'
      }
    })

    instructorPaymentSheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Profesor', key: 'name', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Cantidad', key: 'amount', width: 30 },
      { header: 'Precio por hora', key: 'pricePerHour', width: 30 },
      { header: 'Mes', key: 'workedMonth', width: 30 },
      { header: 'Fecha de pago', key: 'paymentDate', width: 30 },
      { header: 'Profesor (link)', key: 'instructorId', width: 30 }
    ]

    instructorPayment.forEach((payment: InstructorPayment) => {
      const instructor = instructors.find(
        (instructor: Instructor) => instructor.id === payment.instructorId
      )

      const row = instructorPaymentSheet.addRow({
        id: payment.id,
        name: instructor?.name ?? '',
        amount: payment.amount.toString(),
        dni: instructor?.dni.toString(),
        pricePerHour: payment.pricePerHoour.toString(),
        workedMonth: payment.workedMonth.toString(),
        paymentDate: payment.paymentDate
      })

      const accountRowIndex =
        instructors.findIndex(
          (instructor) => instructor.id === payment.instructorId
        ) + 2

      if (accountRowIndex > 1) {
        const username = instructor?.name ?? ''
        const hyperlink = encodeURI(`'Profesores'!A${accountRowIndex}`)
        row.getCell('instructorId').value = {
          text: username,
          hyperlink
        }
      } else {
        row.getCell('instructorId').value = 'Account not found'
      }
    })

    employeePaymentSheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Empleado', key: 'name', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Cantidad', key: 'amount', width: 30 },
      { header: 'Mes', key: 'workedMonth', width: 30 },
      { header: 'Fecha de pago', key: 'paymentDate', width: 30 },
      { header: 'Empleado (link)', key: 'employeeId', width: 30 }
    ]

    employeePayment.forEach((payment: EmployeePayment) => {
      const employee = employees.find(
        (employee: Employee) => employee.id === payment.employeeId
      )

      const row = employeePaymentSheet.addRow({
        id: payment.id,
        name: employee?.name ?? '',
        dni: employee?.dni.toString(),
        amount: payment.amount.toString(),
        workedMonth: payment.monthPayment.toString(),
        paymentDate: payment.date
      })

      const accountRowIndex =
        instructors.findIndex(
          (instructor) => instructor.id === payment.employeeId
        ) + 2

      if (accountRowIndex > 1) {
        const username = employee?.name ?? ''
        const hyperlink = encodeURI(`'Empleados'!A${accountRowIndex}`)
        row.getCell('employeeId').value = {
          text: username,
          hyperlink
        }
      } else {
        row.getCell('employeeId').value = 'Account not found'
      }
    })

    paymentsSheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Cantidad', key: 'amount', width: 30 },
      { header: 'Fecha', key: 'date', width: 30 },
      { header: 'Alumno', key: 'name', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Perfil Alumno (link)', key: 'memberId', width: 30 }
    ]

    payments.forEach((payment: Payment) => {
      const member = members.find(
        (member: Member) => member.id === payment.memeberId
      )

      const row = paymentsSheet.addRow({
        id: payment.id,
        amount: payment.amount.toString(),
        date: payment.date,
        name: member?.name ?? '',
        dni: member?.dni.toString()
      })

      const accountRowIndex =
        members.findIndex((member) => member.id === payment.memeberId) + 2

      if (accountRowIndex > 1) {
        const username = member?.name ?? ''
        const hyperlink = encodeURI(`'Alumnos'!A${accountRowIndex}`)
        row.getCell('memberId').value = {
          text: username,
          hyperlink
        }
      } else {
        row.getCell('memberId').value = 'Account not found'
      }
    })

    billedConsultationSheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Alumno', key: 'name', width: 30 },
      { header: 'DNI', key: 'dni', width: 30 },
      { header: 'Cantidad', key: 'amount', width: 30 },
      { header: 'Fecha', key: 'date', width: 30 },
      { header: 'Numero de autorización', key: 'autorizationNumber', width: 30 },
      { header: 'Perfil Alumno (link)', key: 'memberId', width: 30 }
    ]

    billedConsultation.forEach((billed: BilledConsultation) => {
      const subscription = subsciptions.find((subs) => subs.id === billed.subscriptionId)

      const member = members.find(
        (member: Member) => member.id === subscription?.memberId
      )

      const row = billedConsultationSheet.addRow({
        id: billed.id,
        name: member?.name ?? '',
        dni: member?.dni.toString(),
        amount: billed.amount.toString(),
        autorizationNumber: billed.autorizationNumber.toString(),
        date: billed.date
      })

      const accountRowIndex =
        members.findIndex((member) => member.id === subscription?.memberId) + 2

      if (accountRowIndex > 1) {
        const username = member?.name ?? ''
        const hyperlink = encodeURI(`'Alumnos'!A${accountRowIndex}`)
        row.getCell('memberId').value = {
          text: username,
          hyperlink
        }
      } else {
        row.getCell('memberId').value = 'Account not found'
      }
    })

    const buffer = await workbook.xlsx.writeBuffer()

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=users.xlsx'
      }
    })
  } catch (error) {
    console.log(error)
    return new Response('Error NEXT', {
      status: 345
    })
  }
}
