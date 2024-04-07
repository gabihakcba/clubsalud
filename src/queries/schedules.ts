import axios from 'axios'
import { type Class_, type Setter, type Schedule } from 'utils/types'
import { getClassesByName } from './classes'
import { getInstructorByName } from './instructors'
import { path } from 'utils/path'

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get(`${path()}/api/schedules`)
  return response.data
}

export const assignClass = async ({
  className,
  scheduleId,
  setClass_
}: {
  className: string
  scheduleId: number
  setClass_: Setter
}): Promise<Class_> => {
  const classInfo = await getClassesByName(className)
  const classId = classInfo.data.id
  const response = await axios.patch(`${path()}/api/schedules/setClass`, {
    data: {
      classId,
      scheduleId
    }
  })
  setClass_(classInfo.data)
  return response.data
}

export const assignInstructor = async ({
  instructorName,
  scheduleId,
  setInstructor
}: {
  instructorName: string
  scheduleId: number
  setInstructor: Setter
}): Promise<void> => {
  const instructorInfo = await getInstructorByName(instructorName)
  const instructorId = instructorInfo.data.id
  await axios.patch(`${path()}/api/schedules/setInstructor`, {
    data: {
      instructorId,
      scheduleId
    }
  })
  setInstructor(instructorInfo.data)
}
