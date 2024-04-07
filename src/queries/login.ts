import axios from 'axios'
import { path } from 'utils/path'
import { type QueriesResponse, type LogIn } from 'utils/types'

export const signInAccount = async (data: LogIn): Promise<QueriesResponse> => {
  try {
    const response = await axios.post(`${path()}/api/login`, {
      ...data
    })
    if (response.status === 200) {
      return {
        status: response.status,
        data: true
      }
    } else {
      return {
        status: response.status,
        data: false
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: false,
      error
    }
  }
}
