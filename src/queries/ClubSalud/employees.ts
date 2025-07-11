import {
  type CreateAccount,
  type CreateEmployee,
  type Employee
} from 'utils/ClubSalud/types'
import { apiClubSalud } from 'utils/axios.service'

const formatData = (data: CreateEmployee): any => {
  return {
    ...data,
    dni: String(data.dni),
    cuit: data.cuit ? String(data.cuit) : null,
    phoneNumber: String(data.phoneNumber)
  }
}

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await apiClubSalud.get('/employee')
  return response.data
}

export const createEmployee = async (data: {
  employee: CreateEmployee
  account: CreateAccount
}): Promise<Employee> => {
  try {
    const response = await apiClubSalud.post('/employee', {
      employee: formatData(data.employee),
      account: data.account
    })
    return response.data
  } catch (error) {
    const message = error?.response
      ? (error.response.data.message as string)
      : 'Problemas con el servidor'
    throw new Error(message)
  }
}

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const { id, ...data } = employee
  const response = await apiClubSalud.patch(`/employee/${id}`, formatData(data))
  return response.data
}

export const deleteEmployee = async (employeeId: number): Promise<Employee> => {
  const response = await apiClubSalud.delete(`/employee/${employeeId}`)
  return response.data
}
