import axios from 'axios'
import { type Class_, type Schedule, type Instructor } from 'utils/types'
import { getClassesByName } from './classes'
import { getInstructorByName } from './instructors'
import { path } from 'utils/path'

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get(`${path()}/api/schedules`)
  return response.data
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
  const response = await axios.patch(`${path()}/api/schedules/setClass`, {
    data: {
      classId,
      scheduleId
    }
  })
  return response.data
}

export const assignInstructor = async ({
  instructorName,
  scheduleId
}: {
  instructorName: string
  scheduleId: number
}): Promise<Instructor> => {
  const instructorInfo = await getInstructorByName(instructorName)
  const instructorId = instructorInfo.data.id
  const response = await axios.patch(`${path()}/api/schedules/setInstructor`, {
    data: {
      instructorId,
      scheduleId
    }
  })
  return response.data
}
