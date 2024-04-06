import axios from 'axios'
import { CreateSubscription, Member, Promotion } from 'utils/types'

interface params {
  memberId: number
  promotion: Promotion
}

export const setSubscription = async ({ memberId, promotion }: params) => {
  const parsed: CreateSubscription = {
    date: new Date(),
    paid: false,
    remaining: promotion.amountPrice,
    total: promotion.amountPrice,
    promotionId: promotion.id,
    memberId: memberId
  }
  const response = await axios.post(
    'http://localhost:3000/api/subscriptions',
    parsed
  )
  return response.data
}

export const getSubscriptions = async (): Promise<Member[]> => {
  const response = await axios.get('http://localhost:3000/api/subscriptions')
  return response.data
}
