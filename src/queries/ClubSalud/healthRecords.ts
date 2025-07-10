import { type HealthPlanRecord } from 'utils/ClubSalud/types'
import { apiClubSalud } from 'utils/axios.service'

export const deleteHealthRecord = async (
  id: number
): Promise<HealthPlanRecord> => {
  const response = await apiClubSalud.delete(`/health-plan-record/${id}`)
  return response.data
}
