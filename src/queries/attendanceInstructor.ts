import axios from 'axios'
import { path } from 'utils/path'
import { type AttendanceInstructor } from 'utils/types'

export const getAttendancesInstructor = async (): Promise<
AttendanceInstructor[]
> => {
  const response = await axios.get(`${path()}/api/attendanceInstructor`)
  return response.data
}

export const getAttendancesInstructorById = async (
  instructorId: number
): Promise<AttendanceInstructor[]> => {
  const response = await axios.get(
    `${path()}/api/attendanceInstructor?instructorId=${instructorId}`
  )
  return response.data
}

export const createAttendanceInstructor = async ({
  instructorId,
  classId,
  date
}: {
  instructorId: number
  classId: number,
  date: Date
}): Promise<AttendanceInstructor> => {
  const response = await axios.post(`${path()}/api/attendanceInstructor`, {
    instructorId,
    classId,
    date
  })

  return response.data
}

export const deleteAttendanceInstructor = async (
  attendanceInstructorId: number
): Promise<AttendanceInstructor> => {
  const response = await axios.delete(`${path()}/api/attendanceInstructor`, {
    data: attendanceInstructorId
  })
  return response.data
}
