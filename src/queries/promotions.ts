import axios from 'axios'
import { path } from 'utils/path'
import { type CreatePromotion, type Promotion } from 'utils/types'

export const getPromotions = async (): Promise<Promotion[]> => {
  const response = await axios.get(`${path()}/api/promotions`)
  return response.data
}

export const deletePromotion = async (id: number): Promise<Promotion> => {
  const response = await axios.delete(`${path()}/api/promotions`, {
    data: { id }
  })
  return response.data
}

export const createPromotion = async (
  promotion: CreatePromotion
): Promise<Promotion> => {
  const response = await axios.post(`${path()}/api/promotions`, promotion)
  return response.data.promotion
}

export const updatePromotion = async (
  promotion: Promotion
): Promise<Promotion> => {
  const response = await axios.patch(`${path()}/api/promotions`, promotion)
  return response.data
}
