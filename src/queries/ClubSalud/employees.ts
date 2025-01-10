import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type CreateEmployee, type Employee } from 'utils/ClubSalud/types'
import JSONbig from 'json-bigint'

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(`${path()}/api/employees`)
  return response.data
}

export const createEmployee = async (
  employee: CreateEmployee
): Promise<Employee> => {
  console.log('creating')
  const response = await axios.post(
    `${path()}/api/employees`,
    JSONbig.stringify(employee)
  )
  return response.data
}

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.patch(
    `${path()}/api/employees`,
    JSONbig.stringify(employee)
  )
  return response.data
}

export const deleteEmployee = async (employeeId: number): Promise<Employee> => {
  const response = await axios.delete(`${path()}/api/employees`, {
    data: employeeId
  })
  return response.data
}
