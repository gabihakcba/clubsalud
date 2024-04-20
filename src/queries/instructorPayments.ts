import axios from 'axios'
import { path } from 'utils/path'
import {
  type CreateInstructorPayment,
  type InstructorPayment
} from 'utils/types'

export const getInstructorPayments = async (): Promise<InstructorPayment[]> => {
  const response = await axios.get(`${path()}/api/instructorPayments`)
  return response.data
}

export const createInstructorPayment = async (
  instructorPayment: CreateInstructorPayment
): Promise<InstructorPayment> => {
  const response = await axios.post(
    `${path()}/api/instructorPayments`,
    instructorPayment
  )
  return response.data
}

export const deleteInstructorPayment = async (
  id: number
): Promise<InstructorPayment> => {
  const response = await axios.delete(`${path()}/api/instructorPayments`, {
    data: id
  })
  return response.data
}
