import axios from 'axios'
import { path } from 'utils/path'
import { type Subscription, type CreateSubscription } from 'utils/types'

export const setSubscription = async (
  subscription: CreateSubscription
): Promise<Subscription> => {
  const response = await axios.post(`${path()}/api/subscriptions`, subscription)
  return response.data
}

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await axios.get(`${path()}/api/subscriptions`)
  return response.data
}
