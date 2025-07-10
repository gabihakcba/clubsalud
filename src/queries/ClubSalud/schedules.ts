import { type Schedule, type Instructor } from 'utils/ClubSalud/types'
import { apiClubSalud } from 'utils/axios.service'

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await apiClubSalud.get('/schedule')
  return response.data
}

export const assignClass = async ({
  classId,
  scheduleId
}: {
  classId: string | number
  scheduleId: number
}): Promise<Schedule> => {
  try {
    const response = await apiClubSalud.patch(`/schedule/${scheduleId}`, {
      classId
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const assignInstructor = async ({
  instructorId,
  scheduleId
}: {
  instructorId: number
  scheduleId: number
}): Promise<Instructor> => {
  try {
    const response = await apiClubSalud.patch(`/schedule/${scheduleId}`, {
      instructorInCharge: instructorId
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const clearSchedule = async (id: number): Promise<Schedule> => {
  const response = await apiClubSalud.delete(`/schedule/clear/${id}`)
  return response.data
}
