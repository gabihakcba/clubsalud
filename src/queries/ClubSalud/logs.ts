import { apiClubSalud } from 'utils/axios.service'
import { type UserLog } from 'utils/ClubSalud/types'

export const getLogs = async (): Promise<UserLog[]> => {
  const response = await apiClubSalud.get('log')
  return response.data
}
