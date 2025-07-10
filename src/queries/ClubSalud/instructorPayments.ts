import { apiClubSalud } from 'utils/axios.service'
import {
  type InstructorPrice,
  type CreateInstructorPrice,
  type CreateInstructorPayment,
  type InstructorPayment
} from 'utils/ClubSalud/types'

export const getInstructorPayments = async (): Promise<InstructorPayment[]> => {
  const response = await apiClubSalud.get('/instructor-payment')
  return response.data
}

export const createInstructorPayment = async (
  instructorPayment: CreateInstructorPayment
): Promise<InstructorPayment> => {
  console.log('to mmake request', instructorPayment)
  try {
    const response = await apiClubSalud.post(
      '/instructor-payment',
      instructorPayment
    )
    console.log('the response was:', response)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const deleteInstructorPayment = async (
  id: number
): Promise<InstructorPayment> => {
  const response = await apiClubSalud.delete(`/instructor-payment/${id}`)
  return response.data
}

export const getInstructorPrice = async (): Promise<InstructorPrice[]> => {
  const response = await apiClubSalud.get('/instructor-price')
  return response.data
}

export const createInstructorPrice = async (
  data: CreateInstructorPrice
): Promise<InstructorPrice> => {
  const response = await apiClubSalud.post('/instructor-price', data)
  return response.data
}

export const deleteInstructorPrice = async (
  id: number
): Promise<InstructorPrice> => {
  const response = await apiClubSalud.delete(`/instructor-price/${id}`)
  return response.data
}

export const changeStateInstructorPrice = async (
  id: number,
  state: boolean
): Promise<InstructorPrice> => {
  const response = await apiClubSalud.patch(`instructor-price/${id}`, {
    active: !state
  })
  return response.data
}
