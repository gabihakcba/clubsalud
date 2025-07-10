import { apiClubSalud } from 'utils/axios.service'
import { type CreatePromotion, type Promotion } from 'utils/ClubSalud/types'

export const getPromotions = async (): Promise<Promotion[]> => {
  const response = await apiClubSalud.get('/promotion')
  return response.data
}

export const deletePromotion = async (id: number): Promise<Promotion> => {
  const response = await apiClubSalud.delete(`/promotion/${id}`)
  return response.data
}

export const createPromotion = async (
  promotion: CreatePromotion
): Promise<Promotion> => {
  const response = await apiClubSalud.post('/promotion', promotion)
  return response.data
}

export const updatePromotion = async (
  promotion: Promotion
): Promise<Promotion> => {
  const { id, ...data } = promotion
  const response = await apiClubSalud.patch(`/promotion/${id}`, data)
  return response.data
}
