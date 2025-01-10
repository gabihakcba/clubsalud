import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type CreateClass_, type Class_ } from 'utils/ClubSalud/types'

interface GetClass {
  _: Response | null
  data: Class_
}

export async function createClass(class_: CreateClass_): Promise<GetClass> {
  return await axios.post(`${path()}/api/classes`, class_)
}

export async function deleteClass(id: number): Promise<GetClass> {
  return await axios.delete(`${path()}/api/classes`, {
    data: { id }
  })
}

export async function getClasses(): Promise<Class_[]> {
  const response = await axios.get(`${path()}/api/classes`)
  return response.data
}

export async function getClassesByName(name: string): Promise<GetClass> {
  return await axios.get(`${path()}/api/classes/${name}`)
}

export async function getClassById(
  id: number | string | undefined
): Promise<GetClass> {
  if (!id) {
    return { _: null, data: { id: 0, name: '', duration: 0 } }
  }
  return await axios.get(`${path()}/api/classes/${id}`)
}

export async function editClass(class_: Class_): Promise<GetClass> {
  const response = await axios.patch(`${path()}/api/classes`, class_)
  return response.data
}
