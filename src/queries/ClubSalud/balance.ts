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

export const getCobrosParticulares = async (date: Date): Promise<CobroParticular> => {
  try {
    const response = await apiClubSalud.get(`/balance/cobros-particulares?date=${DateUtils.toBackendFormat(date)}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getCobrosObraSocial = async (date: Date): Promise<CobroObraSocial> => {
  try {
    const response = await apiClubSalud.get(`/balance/cobros-obrasocial?date=${DateUtils.toBackendFormat(date)}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getCobros = async (date: Date): Promise<Cobro> => {
  try {
    const response = await apiClubSalud.get(`/balance/cobros?date=${DateUtils.toBackendFormat(date)}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getPagos = async (date: Date): Promise<Pagos> => {
  try {
    const response = await apiClubSalud.get(`/balance/pagos?date=${DateUtils.toBackendFormat(date)}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getBalance = async (date: Date): Promise<Balance> => {
  try {
    const response = await apiClubSalud.get(`/balance?date=${DateUtils.toBackendFormat(date)}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}
