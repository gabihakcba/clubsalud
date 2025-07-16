import { apiClubSalud } from 'utils/axios.service'
import { DateUtils } from 'utils/ClubSalud/dates'
import {
  type Subscription,
  type CreateSubscription
} from 'utils/ClubSalud/types'

export const setSubscription = async (
  subscription: CreateSubscription
): Promise<Subscription> => {
  const initialDate = DateUtils.newDate(subscription.initialDate)
  const date = DateUtils.newDate(subscription.date)

  const response = await apiClubSalud.post('/subscription', {
    ...subscription,
    initialDate,
    date
  })
  return response.data
}

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await apiClubSalud.get('/subscription')
  return response.data
}

export const deleteSubscription = async (id: number): Promise<Subscription> => {
  const response = await apiClubSalud.delete(`/subscription/${id}`)
  return response.data
}

export const updateIsByOS = async (
  id: number,
  isByOS: boolean
): Promise<Subscription> => {
  const response = await apiClubSalud.patch(`/subscription/${id}`, { isByOS })
  return response.data
}

export const updateState = async (
  id: number,
  active: boolean
): Promise<Subscription> => {
  const response = await apiClubSalud.patch(`/subscription/${id}`, { active })
  return response.data
}

export const getSubscriptionsToBill = async (): Promise<Subscription[]> => {
  const response = await apiClubSalud.get('/subscription/to-bill')
  return response.data
}
