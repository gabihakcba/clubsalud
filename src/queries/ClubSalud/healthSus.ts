import { apiClubSalud } from 'utils/axios.service'
import {
  type CreateHealthPlanSubscribed,
  type HealthPlanSubscribed
} from 'utils/ClubSalud/types'

export const createHealthSubscribed = async (
  data: CreateHealthPlanSubscribed
): Promise<HealthPlanSubscribed> => {
  const response = await apiClubSalud.post('/health-plan-subscribed', data)
  return response.data
}

export const deleteHealthSubscribed = async (
  id: number | string
): Promise<HealthPlanSubscribed> => {
  const response = await apiClubSalud.delete(`/health-plan-subscribed/${id}`)
  return response.data
}

export const editHealthSubscribed = async (
  id: number,
  afiliateNumber: number | string
): Promise<HealthPlanSubscribed> => {
  const response = await apiClubSalud.patch(`/health-plan-subscribed/${id}`, {
    afiliateNumber
  })
  return response.data
}
