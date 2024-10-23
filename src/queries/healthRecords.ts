import { type HealthPlanRecord } from '@prisma/client'
import axios from 'axios'
import { path } from 'utils/path'

export const getHealthRecords = async (): Promise<HealthPlanRecord[]> => {
  const response = await axios.get(`${path()}/api/healthRecords`)
  return response.data
}

export const createHealthRecord = async (data: {
  id: number
  price: number
}): Promise<HealthPlanRecord> => {
  const response = await axios.post(`${path()}/api/healthRecords`, data)
  return response.data.record
}

export const deleteHealthRecord = async (
  id: number
): Promise<HealthPlanRecord> => {
  const response = await axios.delete(`${path()}/api/healthRecords`, {
    data: id
  })
  return response.data
}
