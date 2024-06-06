import axios from 'axios'
import { path } from 'utils/path'
import { type LogIn, type Account } from 'utils/types'

export const signInAccount = async (data: LogIn): Promise<Account> => {
  const response = await axios.post(`${path()}/api/login`, {
    ...data
  })
  return response.data
}
