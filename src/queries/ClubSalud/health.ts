import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type CreateHealthPlan, type HealthPlan } from 'utils/ClubSalud/types'

export const getHealthPlans = async (): Promise<HealthPlan[]> => {
  const response = await axios.get(`${path()}/api/health`)
  return response.data
}

export const createHealthPlan = async (
  data: CreateHealthPlan
): Promise<HealthPlan> => {
  const response = await axios.post(`${path()}/api/health`, data)
  return response.data.healthPlan
}

export const updateHealthPlan = async (
  data: HealthPlan
): Promise<HealthPlan> => {
  const response = await axios.patch(`${path()}/api/health`, data)
  return response.data
}

export const deleteHealthPlan = async (
  id: number | string
): Promise<HealthPlan> => {
  const response = await axios.delete(`${path()}/api/health`, { data: { id } })
  return response.data
}
