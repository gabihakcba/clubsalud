import {
  type Instructor,
  type CreateInstructor,
  type CreateAccount
} from 'utils/ClubSalud/types'
import { apiClubSalud } from 'utils/axios.service'

export const getInstructorById = async (id: number): Promise<Instructor> => {
  const response = await apiClubSalud.get(`/instructor/${id}`)
  return response.data
}

export const createInstructor = async ({
  account,
  instructor
}: {
  account: CreateAccount
  instructor: CreateInstructor
}): Promise<Instructor> => {
  const response = await apiClubSalud.post('/instructor', {
    account,
    instructor
  })
  return response.data
}

export const deleteInstructor = async (id: number): Promise<Instructor> => {
  const response = await apiClubSalud.delete(`/instructor/${id}`)
  return response.data
}

export const updateInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  const response = await apiClubSalud.patch('/instructor', instructor)
  return response.data
}

export const getInstructors = async (): Promise<Instructor[]> => {
  const response = await apiClubSalud.get('/instructor')
  return response.data
}
