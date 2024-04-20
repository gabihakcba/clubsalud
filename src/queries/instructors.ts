import { type Instructor, type CreateInstructor } from 'utils/types'
import axios from 'axios'
import { path } from 'utils/path'

interface GetInsInstructor {
  _: Response | null
  data: Instructor
}

export const getInstructorById = async (
  id: number | undefined
): Promise<GetInsInstructor> => {
  if (!id) {
    return {
      _: null,
      data: {
        id: 0,
        name: '',
        lastName: '',
        dni: BigInt(0),
        phoneNumber: BigInt(0),
        address: '',
        email: '',
        degree: '',
        accountId: 0
      }
    }
  }
  return await axios.get(`${path()}/api/instructors/${id}`)
}

export const createInstructor = async (
  newInstructor: CreateInstructor
): Promise<Instructor> => {
  const response = await axios.post(`${path()}/api/instructors`, {
    ...newInstructor
  })
  return response.data
}

export const deleteInstructor = async (id: number): Promise<Instructor> => {
  const response = await axios.delete(`${path()}/api/instructors`, {
    data: {
      id
    }
  })
  return response.data
}

export const updateInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  const response = await axios.patch(`${path()}/api/instructors`, {
    ...instructor
  })
  return response.data
}

export const getInstructorByName = async (
  name: string
): Promise<GetInsInstructor> => {
  return await axios.get(`${path()}/api/instructors/${name}`)
}

export const getInstructors = async (): Promise<Instructor[]> => {
  const response = await axios.get(`${path()}/api/instructors`)
  return response.data
}
