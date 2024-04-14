import axios from 'axios'
import { path } from 'utils/path'
import { type CreateNotification, type Notification } from 'utils/types'

export const createNotification = async (
  notification: CreateNotification
): Promise<Notification> => {
  const response = await axios.post(`${path()}/api/notifications`, notification)
  return response.data
}

export const getAllNotifications = async (): Promise<Notification[]> => {
  const response = await axios.get(`${path()}/api/notifications`)
  return response.data
}

export const getAccountNotifications = async (
  id: number | string
): Promise<Notification[]> => {
  const response = await axios.get(`${path()}/api/notifications/${id}`)
  return response.data
}
