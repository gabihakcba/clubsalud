import { apiClubSalud } from 'utils/axios.service'
import { DateUtils } from 'utils/ClubSalud/dates'
import {
  type EmployeePayment,
  type InstructorPayment,
  type BilledConsultation,
  type Payment
} from 'utils/ClubSalud/types'

interface CobroParticularItem {
  total: number
  pagos: Payment[]
}

interface CobroObraSocial {
  total: number
  pagos: BilledConsultation[]
}

interface CobroParticular {
  total: CobroParticularItem
  efectivo: CobroParticularItem
  transferencia: CobroParticularItem
}

interface Cobro {
  total: number
  particular: CobroParticularItem
  obraSocial: CobroObraSocial
}

interface Pagos {
  total: number
  pagosEmpleados: {
    total: number
    pagos: EmployeePayment[]
  }
  pagosProfesores: {
    total: number
    pagos: InstructorPayment[]
  }
}

interface Balance {
  balance: number
  ingresos: number
  egresos: number
}

export const getCobrosParticulares = async (
  date: Date
): Promise<CobroParticular> => {
  try {
    const response = await apiClubSalud.get(
      `/balance/cobros-particulares?date=${DateUtils.toLocalString(date)}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getCobrosObraSocial = async (
  date: Date
): Promise<CobroObraSocial> => {
  try {
    const response = await apiClubSalud.get(
      `/balance/cobros-obrasocial?date=${DateUtils.toLocalString(date)}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getCobros = async (date: Date): Promise<Cobro> => {
  try {
    const response = await apiClubSalud.get(
      `/balance/cobros?date=${DateUtils.toLocalString(date)}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getCobrosAnual = async (): Promise<
Array<{ month: string; cobros: Cobro }>
> => {
  const cobrosPorMes: Array<{ month: string; cobros: Cobro }> = []

  const hoy = DateUtils.getCurrentMoment().startOf('month')

  const fechas = Array.from({ length: 12 }).map((_, i) =>
    hoy.clone().subtract(i, 'months')
  )

  for (const fecha of fechas) {
    const cobros = await getCobros(fecha.toDate())
    cobrosPorMes.push({
      month: `${DateUtils.getNameMonth(fecha)} ${DateUtils.getNameYear(fecha)}`, // o 'MMMM YYYY' si querés el nombre del mes
      cobros
    })
  }

  return cobrosPorMes.reverse()
}

export const getPagosAnual = async (): Promise<
Array<{ month: string; pagos: Pagos }>
> => {
  const pagosPorMes: Array<{ month: string; pagos: Pagos }> = []

  const hoy = DateUtils.getCurrentMoment().startOf('month')

  const fechas = Array.from({ length: 12 }).map((_, i) =>
    hoy.clone().subtract(i, 'months')
  )

  for (const fecha of fechas) {
    const pagos = await getPagos(fecha.toDate())
    pagosPorMes.push({
      month: `${DateUtils.getNameMonth(fecha)} ${DateUtils.getNameYear(fecha)}`, // o 'MMMM YYYY' si querés el nombre del mes
      pagos
    })
  }

  return pagosPorMes.reverse()
}

export const getBalanceAnual = async (): Promise<
Array<{ month: string; balance: Balance }>
> => {
  const balancePorMes: Array<{ month: string; balance: Balance }> = []

  const hoy = DateUtils.getCurrentMoment().startOf('month')

  const fechas = Array.from({ length: 12 }).map((_, i) =>
    hoy.clone().subtract(i, 'months')
  )

  for (const fecha of fechas) {
    const balance = await getBalance(fecha.toDate())
    balancePorMes.push({
      month: `${DateUtils.getNameMonth(fecha)} ${DateUtils.getNameYear(fecha)}`, // o 'MMMM YYYY' si querés el nombre del mes
      balance
    })
  }

  return balancePorMes.reverse()
}

export const getPagos = async (date: Date): Promise<Pagos> => {
  try {
    const response = await apiClubSalud.get(
      `/balance/pagos?date=${DateUtils.toLocalString(date)}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getBalance = async (date: Date): Promise<Balance> => {
  try {
    const response = await apiClubSalud.get(
      `/balance?date=${DateUtils.toLocalString(date)}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}
