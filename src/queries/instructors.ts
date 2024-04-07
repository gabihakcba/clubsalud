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
): Promise<GetInsInstructor> => {
  return await axios.post(`${path()}/api/instructors`, {
    ...newInstructor
  })
}

export const deleteInstructor = async (
  id: number
): Promise<GetInsInstructor> => {
  return await axios.delete(`${path()}/api/instructors`, {
    data: {
      id
    }
  })
}

export const updateInstructor = async (
  instructor: Instructor
): Promise<GetInsInstructor> => {
  return await axios.patch(`${path()}/api/instructors`, {
    ...instructor
  })
}

export async function getInstructorByName(
  name: string
): Promise<GetInsInstructor> {
  return await axios.get(`${path()}/api/instructors/${name}`)
}
