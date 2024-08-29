import axios from 'axios'
import { path } from 'utils/path'
import { type CreatePlan, type Plan } from 'utils/types'

export const createPlan = async (plan: CreatePlan): Promise<Plan> => {
  const response = await axios.post(`${path()}/api/plans`, plan)
  return response.data
}

export const getPlan = async (): Promise<Plan[]> => {
  const response = await axios.get(`${path()}/api/plans`)
  return response.data
}

export const updatePlan = async (plan: Plan): Promise<Plan> => {
  const response = await axios.patch(`${path()}/api/plans`, plan)
  return response.data
}

export const deletePlan = async (planId: number): Promise<Plan> => {
  const response = await axios.delete(`${path()}/api/plans`, { data: planId })
  return response.data
}
