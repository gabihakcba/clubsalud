import axios from 'axios'
import { type Class_, type Schedule, type Instructor } from 'utils/types'
import { getClassesByName } from './classes'
import { path } from 'utils/path'

export const getSchedules = async (): Promise<Schedule[]> => {
  // const response1 = await axios.get(`${path()}/api/schedules`, {
  //   headers: {
  //     'Cache-Control': 'no-cache',
  //     Pragma: 'no-cache',
  //     Expires: '0',
  //     cache: 'no-store'
  //   }
  // })
  const response = await fetch(`${path()}/api/schedules`, {
    next: { revalidate: 0 }
  })
  const data = await response.json()
  console.log('from service: ', data)
  return data
}

export const assignClass = async ({
  className,
  scheduleId
}: {
  className: string
  scheduleId: number
}): Promise<Class_> => {
  const classInfo = await getClassesByName(className)
  const classId = classInfo.data.id
  await axios.patch(`${path()}/api/schedules/setClass`, {
    data: {
      classId,
      scheduleId
    }
  })
  return classInfo.data
}

export const assignInstructor = async ({
  instructorId,
  scheduleId
}: {
  instructorId: number
  scheduleId: number
}): Promise<Instructor> => {
  const response = await axios.patch(`${path()}/api/schedules/setInstructor`, {
    data: {
      instructorId,
      scheduleId
    }
  })
  return response.data
}
