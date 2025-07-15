import { apiClubSalud } from 'utils/axios.service'
import { DateUtils } from 'utils/ClubSalud/dates'
import {
  type CreateEmployeePayment,
  type EmployeePayment
} from 'utils/ClubSalud/types'

export const createEmployeePayment = async (
  data: CreateEmployeePayment
): Promise<EmployeePayment> => {
  const response = await apiClubSalud.post('/employee-payment', {
    ...data,
    monthPayment: DateUtils.newDate(data.monthPayment),
    date: DateUtils.newDate(data.date)
  })
  return response.data
}

export const getEmployeePayments = async (): Promise<EmployeePayment[]> => {
  const response = await apiClubSalud.get('/employee-payment')
  return response.data
}

export const deleteEmployeePayment = async (
  id: number
): Promise<EmployeePayment> => {
  const response = await apiClubSalud.delete(`/employee-payment/${id}`)
  return response.data
}
