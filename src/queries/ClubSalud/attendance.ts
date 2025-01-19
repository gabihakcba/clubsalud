import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type Attendance } from 'utils/ClubSalud/types'

export const createAttendance = async ({
  memberId,
  classId,
  date
}: {
  memberId: number
  classId: number
  date: Date
}): Promise<Attendance> => {
  const response = await axios.post(`${path()}/api/attendance`, {
    memberId,
    classId,
    date
  })

  return response.data
}

export const getAttendances = async (): Promise<Attendance[]> => {
  const response = await axios.get(`${path()}/api/attendance`)
  return response.data
}

export const getDailyAttendance = async (date: Date): Promise<Attendance[]> => {
  const response = await axios.get(`${path()}/api/attendance?date=${date.toISOString()}`)
  return response.data
}
