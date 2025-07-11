import { apiClubSalud } from 'utils/axios.service'
import {
  type RegistrationForm,
  type CreateRegistrationForm
} from 'utils/ClubSalud/types'

export const createRegistrationForm = async (
  form: CreateRegistrationForm
): Promise<RegistrationForm> => {
  try {
    const response = await apiClubSalud.post('/registration-form', form)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const updateRegistrationForm = async (
  form: RegistrationForm
): Promise<RegistrationForm> => {
  const { id, ...reg } = form
  const response = await apiClubSalud.patch(`/registration-form/${id}`, reg)
  return response.data
}

export const deleteRegistrationForm = async (
  id: number
): Promise<RegistrationForm> => {
  const response = await apiClubSalud.delete(`/registration-form/${id}`)
  return response.data
}
