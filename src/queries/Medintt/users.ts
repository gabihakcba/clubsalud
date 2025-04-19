import axios from 'axios'

export const getUsers = async (): Promise<any> => {
  const response = await axios.get('http://medintt.store')
  console.log(response)
  return response.data
}
