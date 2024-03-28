import axios from 'axios'
import { type Schedule } from 'utils/types'
import { getClassesByName } from './classes'

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get('http://localhost:3000/api/schedules')
  return response.data
}

export const assignClass = async ({
  className,
  scheduleId
}: {
  className: string
  scheduleId: number
}): Promise<Schedule> => {
  const classInfo = await getClassesByName(className)
  const classId = classInfo.data.id
  const response = await axios.patch('http://localhost:3000/api/schedules', {
    data: {
      classId,
      scheduleId
    }
  })
  return response.data
}
