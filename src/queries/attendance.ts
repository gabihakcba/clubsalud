import axios from 'axios'
import { path } from 'utils/path'
import { Attendance } from 'utils/types'

export const createAttendance = async ({
  memberId,
  classId
}: {
  memberId: number
  classId: number
}): Promise<Attendance> => {
  const response = await axios.post(`${path()}/api/attendance`, {
    memberId,
    classId
  })

  return response.data
}

export const getAttendances = async (): Promise<Attendance[]> => {
  const response = await axios.get(`${path()}/api/attendance`)
  return response.data
}
