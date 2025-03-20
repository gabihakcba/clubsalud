import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import {
  type Subscription,
  type CreateSubscription,
  type Member
} from 'utils/ClubSalud/types'

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

export const deleteSubscription = async (id: number): Promise<Subscription> => {
  const response = await axios.delete(`${path()}/api/subscriptions`, {
    data: { id }
  })
  return response.data
}

export const updateSubscription = async (
  id: number,
  type: 'active' | 'isByOS' = 'active'
): Promise<Subscription> => {
  const response = await axios.patch(
    `${path()}/api/subscriptions?action=${type}`,
    {
      id
    }
  )
  return response.data
}

export const getOrderedSubscriptions = async (): Promise<Member[]> => {
  const response = await axios.get(`${path()}/api/subscriptions/expired`)
  return response.data
}
