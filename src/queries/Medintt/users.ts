import axios from 'axios'

export const getUsers = async (): Promise<Response> => {
  return await axios.get('http://45.71.106.68:70')
}
