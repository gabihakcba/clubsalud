import axios from 'axios'
import { path } from 'utils/path'
import { type ScheduleInscription } from 'utils/types'

export const createScheduleInscription = async ({
  memberId,
  scheduleId
}: {
  memberId: number
  scheduleId: number
}): Promise<ScheduleInscription> => {
  try {
    const response = await axios.post(`${path()}/api/scheduleInscription`, {
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
    const response = await axios.get(`${path()}/api/scheduleInscription`)
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
    const response = await axios.get(
      `${path()}/api/scheduleInscription?id=${scheduleId}`
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
  const response = await axios.delete(`${path()}/api/scheduleInscription`, {
    data: inscriptionId
  })
  return response.data
}
