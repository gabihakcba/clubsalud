import axios from 'axios'
import { path } from 'utils/path'
import { type Attendance } from 'utils/types'

export const createAttendance = async ({
  memberId,
  classId,
  date
}: {
  memberId: number
  classId: number,
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
