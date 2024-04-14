import axios from 'axios'
import { path } from 'utils/path'
import {
  type CreateHealthPlanSubscribed,
  type HealthPlanSubscribed
} from 'utils/types'

export const createHealthSubscribed = async (
  data: CreateHealthPlanSubscribed
): Promise<HealthPlanSubscribed> => {
  const response = await axios.post(`${path()}/api/healthSubscribed`, data)
  return response.data
}

export const deleteHealthSubscribed = async (
  id: number | string
): Promise<HealthPlanSubscribed> => {
  const response = await axios.delete(`${path()}/api/healthSubscribed`, {
    data: { id }
  })
  return response.data
}
