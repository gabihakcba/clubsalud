import axios from 'axios'
import { path } from 'utils/path'
import {
  type InstructorPrice,
  type CreateInstructorPrice,
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

export const getInstructorPrice = async (): Promise<InstructorPrice[]> => {
  const response = await axios.get(`${path()}/api/instructorPrice`)
  return response.data
}

export const createInstructorPrice = async (
  data: CreateInstructorPrice
): Promise<InstructorPrice> => {
  const response = await axios.post(`${path()}/api/instructorPrice`, data)
  return response.data
}

export const updateInstructorPrice = async (
  data: InstructorPrice
): Promise<InstructorPrice> => {
  const response = await axios.post(`${path()}/api/instructorPrice`, data)
  return response.data
}
