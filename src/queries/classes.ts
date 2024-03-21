import axios from 'axios'
import { type Class } from 'utils/types'

export async function getClasses(): Promise<Class[]> {
  const response = await axios.get('http://localhost:3000/api/classes')
  return response.data
}
