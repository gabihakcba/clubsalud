import { type Instructor, type CreateInstructor } from 'utils/types'
import axios from 'axios'

interface GetInsResponse {
  _: Response
  data: Instructor
}

export const getInstructorById = async (
  id: number
): Promise<GetInsResponse> => {
  return await axios.get(`http://localhost:3000/api/instructors/${id}`)
}

export const createInstructor = async (
  newInstructor: CreateInstructor
): Promise<GetInsResponse> => {
  return await axios.post('http://localhost:3000/api/instructors', {
    ...newInstructor
  })
}

export const deleteInstructor = async (id: number): Promise<GetInsResponse> => {
  return await axios.delete('http://localhost:3000/api/instructors', {
    data: {
      id
    }
  })
}

export const updateInstructor = async (
  instructor: Instructor
): Promise<GetInsResponse> => {
  return await axios.patch('http://localhost:3000/api/instructors', {
    ...instructor
  })
}
