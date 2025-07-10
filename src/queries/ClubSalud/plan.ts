import { apiClubSalud } from 'utils/axios.service'
import { type CreatePlan, type Plan } from 'utils/ClubSalud/types'

export const createPlan = async (plan: CreatePlan): Promise<Plan> => {
  const response = await apiClubSalud.post('/plan', plan)
  return response.data
}

export const getPlan = async (): Promise<Plan[]> => {
  const response = await apiClubSalud.get('/plan')
  return response.data
}

export const updatePlan = async (plan: Plan): Promise<Plan> => {
  const { id, ...data } = plan
  const response = await apiClubSalud.patch(`/plan/${id}`, data)
  return response.data
}

export const deletePlan = async (planId: number): Promise<Plan> => {
  const response = await apiClubSalud.delete(`/plan/${planId}`)
  return response.data
}
