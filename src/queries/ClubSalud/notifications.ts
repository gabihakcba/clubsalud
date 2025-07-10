import { apiClubSalud } from 'utils/axios.service'
import {
  type CreateNotification,
  type Notification
} from 'utils/ClubSalud/types'

export const createNotification = async (
  notification: CreateNotification
): Promise<Notification> => {
  const response = await apiClubSalud.post('/notification', notification)
  return response.data
}

export const getAllNotifications = async (): Promise<Notification[]> => {
  const response = await apiClubSalud.get('/notification')
  return response.data
}

export const getAccountNotifications = async (
  id: number | string
): Promise<Notification[]> => {
  const response = await apiClubSalud.get(`/notification/${id}`)
  return response.data
}
