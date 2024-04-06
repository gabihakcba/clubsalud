import axios from 'axios'
import { CreateSubscription, Promotion } from 'utils/types'

interface params {
  memberId: number
  promotion: Promotion
}

export const setSubscription = async ({ memberId, promotion }: params) => {
  const parsed: CreateSubscription = {
    date: new Date(),
    paid: false,
    remaining: promotion.amountPrice,
    promotionId: promotion.id,
    memberId: memberId
  }
  const response = await axios.post(
    'http://localhost:3000/api/subscriptions',
    parsed
  )
  return response.data
}
