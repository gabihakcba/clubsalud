import { apiClubSalud } from 'utils/axios.service'
import { type ScheduleInscription } from 'utils/ClubSalud/types'

export const createScheduleInscription = async ({
  memberId,
  scheduleId
}: {
  memberId: number
  scheduleId: number
}): Promise<ScheduleInscription> => {
  try {
    const response = await apiClubSalud.post('/schedule-inscription', {
      memberId,
      scheduleId
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const getScheduleInscription = async (): Promise<
ScheduleInscription[]
> => {
  try {
    const response = await apiClubSalud.get('/schedule-inscription')
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const getScheduleInscriptionByScheduleId = async (
  scheduleId: number
): Promise<ScheduleInscription[]> => {
  try {
    const response = await apiClubSalud.get(
      `/schedule-inscription/search?scheduleId=${scheduleId}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const deleteScheduleInscription = async (
  inscriptionId: number
): Promise<ScheduleInscription> => {
  const response = await apiClubSalud.delete(
    `/schedule-inscription/${inscriptionId}`
  )
  return response.data
}
