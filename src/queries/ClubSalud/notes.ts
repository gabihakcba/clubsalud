import { apiClubSalud } from 'utils/axios.service'
import { type Notes, type CreateNotes } from 'utils/ClubSalud/types'

export const createNote = async (data: CreateNotes): Promise<Notes> => {
  try {
    const response = await apiClubSalud.post('/note', data)
    return response.data
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export const getNotesUnreaded = async (): Promise<Notes[]> => {
  const response = await apiClubSalud.get('/note?readed=false')
  return response.data
}

export const getNotesReaded = async (): Promise<Notes[]> => {
  const response = await apiClubSalud.get('/note?readed=true')
  return response.data
}

export const getAllNotes = async (): Promise<Notes[]> => {
  const response = await apiClubSalud.get('/note')
  return response.data
}

export const changeStatusNotes = async (
  id: string | number
): Promise<Notes> => {
  const response = await apiClubSalud.patch(`/note/${id}`)
  return response.data
}
