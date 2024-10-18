import axios from 'axios'
import { path } from 'utils/path'
import { type RegistrationForm, type CreateRegistrationForm } from 'utils/types'

export const createRegistrationForm = async (
  form: CreateRegistrationForm
): Promise<RegistrationForm> => {
  const response = await axios.post(`${path()}/api/registrationForm`, form)
  return response.data
}

export const updateRegistrationForm = async (
  form: RegistrationForm
): Promise<RegistrationForm> => {
  const response = await axios.patch(`${path()}/api/registrationForm`, form)
  return response.data
}

export const deleteRegistrationForm = async (
  id: number
): Promise<RegistrationForm> => {
  const response = await axios.delete(`${path()}/api/registrationForm`, { data: id })
  return response.data
}
