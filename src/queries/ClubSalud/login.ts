import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type LogIn } from 'utils/ClubSalud/types'

export const signInAccount = async (data: LogIn): Promise<string> => {
  const response = await axios.post(`${path()}/api/login`, {
    ...data
  })
  return response.data
}
