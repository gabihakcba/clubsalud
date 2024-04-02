import axios from 'axios'
import { CreateClass_, type Class_ } from 'utils/types'

interface GetClasses {
  _: Response
  data: Class_[]
}

interface GetClass {
  _: Response | null
  data: Class_
}

export async function createClass(class_: CreateClass_) {
  return await axios.post('http://localhost:3000/api/classes', class_)
}

export async function deleteClass(id: number) {
  return await axios.delete(`http://localhost:3000/api/classes`, {
    data: { id }
  })
}

export async function getClasses(): Promise<GetClasses> {
  return await axios.get('http://localhost:3000/api/classes')
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

export async function editClass(class_: Class_): Promise<GetClass> {
  const response = await axios.patch(
    'http://localhost:3000/api/classes',
    class_
  )
  return response.data
}
