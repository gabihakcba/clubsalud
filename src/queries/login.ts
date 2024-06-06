import axios from 'axios'
import { path } from 'utils/path'
import { type LogIn } from 'utils/types'

export const signInAccount = async (data: LogIn): Promise<string> => {
  const response = await axios.post(`${path()}/api/login`, {
    ...data
  })
  return response.data
}
