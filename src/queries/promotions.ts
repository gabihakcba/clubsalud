import axios from 'axios'
import { type CreatePromotion, type Promotion } from 'utils/types'

export const getPromotions = async (): Promise<Promotion[]> => {
  const response = await axios.get('http://localhost:3000/api/promotions')
  return response.data
}

export const deletePromotion = async (id: number): Promise<Promotion> => {
  const response = await axios.delete('http://localhost:3000/api/promotions', {
    data: { id }
  })
  return response.data
}

export const createPromotion = async (
  promotion: CreatePromotion
): Promise<Promotion> => {
  const response = await axios.post(
    'http://localhost:3000/api/promotions',
    promotion
  )
  return response.data
}

export const updatePromotion = async (
  promotion: Promotion
): Promise<Promotion> => {
  const response = await axios.patch(
    'http://localhost:3000/api/promotions',
    promotion
  )
  return response.data
}
