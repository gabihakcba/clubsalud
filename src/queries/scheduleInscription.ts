import axios from 'axios'
import { path } from 'utils/path'
import { ScheduleInscription } from 'utils/types'

export const createScheduleInscription = async ({
  memberId,
  scheduleId
}: {
  memberId: number
  scheduleId: number
}): Promise<ScheduleInscription> => {
  const response = await axios.patch(`${path()}/api/scheduleInscription`, {
    data: {
      memberId,
      scheduleId
    }
  })
  return response.data
}
