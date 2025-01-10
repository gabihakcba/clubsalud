import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type AttendanceInstructor } from 'utils/ClubSalud/types'

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
  date,
  hours
}: {
  instructorId: number
  classId: number,
  date: Date,
  hours: number
}): Promise<AttendanceInstructor> => {
  const response = await axios.post(`${path()}/api/attendanceInstructor`, {
    instructorId,
    classId,
    date,
    hours
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
