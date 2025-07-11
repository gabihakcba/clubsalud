import { apiClubSalud } from 'utils/axios.service'
import { type CreateClass_, type Class_ } from 'utils/ClubSalud/types'

export async function createClass(class_: CreateClass_): Promise<Class_> {
  const response = await apiClubSalud.post('/class', class_)
  return response.data
}

export async function deleteClass(id: number): Promise<Class_> {
  const response = await apiClubSalud.delete(`/class/${id}`)
  return response.data
}

export async function getClasses(): Promise<Class_[]> {
  const response = await apiClubSalud.get('/class')
  return response.data
}

export async function getClassesByName(name: string): Promise<Class_> {
  const response = await apiClubSalud.get(`/class/search?name=${name}`)
  return response.data
}

export async function getClassById(
  id: number | string
): Promise<Class_> {
  const response = await apiClubSalud.get(`/class/${id}`)
  return response.data
}

export async function editClass(class_: Class_): Promise<Class_> {
  const { id, ...data } = class_
  const response = await apiClubSalud.patch(`/class/${id}`, data)
  return response.data
}
