import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import {
  type CreateHealthPlanSubscribed,
  type HealthPlanSubscribed
} from 'utils/ClubSalud/types'

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

export const editHealthSubscribed = async (
  id: number,
  afiliateNumber: number | string
): Promise<HealthPlanSubscribed> => {
  const response = await axios.patch(`${path()}/api/healthSubscribed`, {
    id,
    afiliateNumber
  })
  return response.data
}
