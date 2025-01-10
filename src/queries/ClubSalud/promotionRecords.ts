import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type PromotionRecord } from 'utils/ClubSalud/types'

export const createPromotionRecord = async (data: {
  id: number
  price: number
}): Promise<PromotionRecord> => {
  const response = await axios.post(`${path()}/api/promotionRecords`, data)
  return response.data.record
}

export const deletePromotionRecord = async (
  id: number
): Promise<PromotionRecord> => {
  const response = await axios.delete(`${path()}/api/promotionRecords`, {
    data: id
  })
  return response.data
}

export const getPromotionRecords = async (): Promise<PromotionRecord[]> => {
  const response = await axios.get(`${path()}/api/promotionRecords`)
  return response.data
}
