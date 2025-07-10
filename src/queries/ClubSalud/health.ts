import { apiClubSalud } from 'utils/axios.service'
import { type CreateHealthPlan, type HealthPlan } from 'utils/ClubSalud/types'

export const getHealthPlans = async (): Promise<HealthPlan[]> => {
  const response = await apiClubSalud.get('/health-plan')
  return response.data
}

export const createHealthPlan = async (
  data: CreateHealthPlan
): Promise<HealthPlan> => {
  const response = await apiClubSalud.post('/health-plan', data)
  return response.data
}

export const updateHealthPlan = async (
  data: HealthPlan
): Promise<HealthPlan> => {
  const { id, ...health } = data
  const response = await apiClubSalud.patch(`/health-plan/${id}`, health)
  return response.data
}

export const deleteHealthPlan = async (
  id: number | string
): Promise<HealthPlan> => {
  const response = await apiClubSalud.delete(`/health-plan/${id}`)
  return response.data
}
