import { apiClubSalud } from 'utils/axios.service'
import { type LogIn } from 'utils/ClubSalud/types'

export const signInAccount = async (
  data: LogIn
): Promise<{
  access_token: string
  user: { id: number; username: string; permissions: string[] }
}> => {
  try {
    const response = await apiClubSalud.post('/auth/login', {
      ...data
    })
    return response.data
  } catch (error) {
    console.log(error.response.data.message)
    throw new Error(JSON.stringify(error.response.data.message))
  }
}
