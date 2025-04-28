import axios from 'axios'

export const logInLaboral = async (data: {
  username: string
  password: string
}): Promise<any> => {
  const response = await axios.post('http://medintt.store/auth/login', data)
  console.log(response)
  return response.data
}
