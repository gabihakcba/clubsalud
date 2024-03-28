import axios from 'axios'
import { type Class_ } from 'utils/types'

interface GetClasses {
  _: Response
  data: Class_[]
}

interface GetClass {
  _: Response | null
  data: Class_
}

export async function getClasses(): Promise<GetClasses> {
  const response = await axios.get('http://localhost:3000/api/classes')
  return response.data
}

export async function getClassesByName(name: string): Promise<GetClass> {
  return await axios.get(`http://localhost:3000/api/classes/${name}`)
}

export async function getClassById(
  id: number | string | undefined
): Promise<GetClass> {
  if (!id) {
    return { _: null, data: { id: 0, name: '', duration: 0 } }
  }
  return await axios.get(`http://localhost:3000/api/classes/${id}`)
}
