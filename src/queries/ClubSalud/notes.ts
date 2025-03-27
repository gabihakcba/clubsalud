import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type Notes, type CreateNotes } from 'utils/ClubSalud/types'

export const createNote = async (data: CreateNotes): Promise<Notes> => {
  const response = await axios.post(`${path()}/api/notes`, data)
  return response.data
}

export const getNotesUnreaded = async (): Promise<Notes[]> => {
  const response = await axios.get(`${path()}/api/notes?readed=false`)
  return response.data
}

export const getNotesReaded = async (): Promise<Notes[]> => {
  const response = await axios.get(`${path()}/api/notes?readed=true`)
  return response.data
}

export const getAllNotes = async (): Promise<Notes[]> => {
  const response = await axios.get(`${path()}/api/notes`)
  return response.data
}

export const changeStatusNotes = async (id: string | number): Promise<Notes> => {
  const response = await axios.patch(`${path()}/api/notes/${id}`)
  return response.data
}
