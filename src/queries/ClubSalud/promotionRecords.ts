import { apiClubSalud } from 'utils/axios.service'
import { type PromotionRecord } from 'utils/ClubSalud/types'

export const createPromotionRecord = async (data: {
  id: number
  price: number
}): Promise<PromotionRecord> => {
  const promotionRecord = {
    promotionId: data.id,
    price: data.price
  }
  const response = await apiClubSalud.post('/promotion-record', promotionRecord)
  return response.data
}

export const deletePromotionRecord = async (
  id: number
): Promise<PromotionRecord> => {
  const response = await apiClubSalud.delete(`/promotion-record/${id}`)
  return response.data
}
