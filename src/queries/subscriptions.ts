import axios from 'axios'
import { path } from 'utils/path'
import {
  type Subscription,
  type CreateSubscription,
  type Promotion
} from 'utils/types'

interface params {
  memberId: number
  promotion: Promotion
}

export const setSubscription = async ({
  memberId,
  promotion
}: params): Promise<Subscription> => {
  const parsed: CreateSubscription = {
    date: new Date(),
    paid: false,
    remaining: promotion.amountPrice,
    total: promotion.amountPrice,
    promotionId: promotion.id,
    memberId
  }
  const response = await axios.post(`${path()}/api/subscriptions`, parsed)
  return response.data
}

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await axios.get(`${path()}/api/subscriptions`)
  return response.data
}
