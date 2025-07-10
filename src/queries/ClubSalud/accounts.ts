import { apiClubSalud } from 'utils/axios.service'
import {
  type Account,
  type CreateAccount,
  type UpdateAccount
} from 'utils/ClubSalud/types'

export const getAccounts = async (): Promise<Account[]> => {
  const response = await apiClubSalud.get('/account')
  return response.data
}

export const createAccount = async (data: CreateAccount): Promise<Account> => {
  try {
    const response = await apiClubSalud.post('/auth/register', {
      username: data.username,
      password: data.password,
      permissions: data.permissions
    })
    return response.data
  } catch (error) {
    const message = error?.resopnse
      ? (error.response.data.message as string)
      : 'Problemas con el servidor'
    throw new Error(message)
  }
}

export const deleteAccount = async (id: number): Promise<Account> => {
  const response = await apiClubSalud.delete(`/account/${id}`)
  return response.data
}

export const updateAccount = async (data: UpdateAccount): Promise<Account> => {
  const { id, repeatpassword, ...updateData } = data
  const response = await apiClubSalud.patch(`/account/${id}`, updateData)
  return response.data
}

export const getAccountById = async (id: string | number): Promise<Account> => {
  const response = await apiClubSalud.get(`/account/${id}`)
  return response.data
}
