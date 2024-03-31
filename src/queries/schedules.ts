import axios from 'axios'
import { Class_, Setter, type Schedule } from 'utils/types'
import { getClassesByName } from './classes'
import { getInstructorByName } from './instructors'

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get('http://localhost:3000/api/schedules')
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
  const response = await axios.patch(
    'http://localhost:3000/api/schedules/setClass',
    {
      data: {
        classId,
        scheduleId
      }
    }
  )
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
  const response = await axios.patch(
    'http://localhost:3000/api/schedules/setInstructor',
    {
      data: {
        instructorId,
        scheduleId
      }
    }
  )
  setInstructor(instructorInfo.data)
}
