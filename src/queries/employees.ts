import axios from 'axios'
import { path } from 'utils/path'
import { type CreateEmployee, type Employee } from 'utils/types'
import JSONbig from 'json-bigint'

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(`${path()}/api/employees`)
  return response.data
}

export const createEmployee = async (
  employee: CreateEmployee
): Promise<Employee> => {
  const response = await axios.post(
    `${path()}/api/employees`,
    JSONbig.stringify(employee)
  )
  return response.data
}

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  try {
    const response = await axios.patch(
      `${path()}/api/employees`,
      JSONbig.stringify({
        data: employee
      })
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}
