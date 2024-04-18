import axios from 'axios'
import { path } from 'utils/path'
import { type CreateEmployeePayment, type EmployeePayment } from 'utils/types'

export const createEmployeePayment = async (
  data: CreateEmployeePayment
): Promise<EmployeePayment> => {
  const response = await axios.post(`${path()}/api/employeePayments`, data)
  return response.data
}

export const getEmployeePayments = async (): Promise<EmployeePayment[]> => {
  const response = await axios.get(`${path()}/api/employeePayments`)
  return response.data
}

export const getEmployeePaymentsById = async (
  id: number | string
): Promise<EmployeePayment[]> => {
  const response = await axios.get(`${path()}/api/employeePayments/${id}`)
  return response.data
}

export const deleteEmployeePayment = async (
  id: number
): Promise<EmployeePayment> => {
  const response = await axios.delete(`${path()}/api/employeePayments`, {
    data: { id }
  })
  return response.data
}
