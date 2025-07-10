import { apiClubSalud } from 'utils/axios.service'
import { type CreateExtraCost, type ExtraCost } from 'utils/ClubSalud/types'

export const getExtraCost = async (): Promise<ExtraCost[]> => {
  const response = await apiClubSalud.get('/extra-cost')
  return response.data
}

export const createExtraCost = async (
  data: CreateExtraCost
): Promise<ExtraCost> => {
  const response = await apiClubSalud.post('/extra-cost', data)
  return response.data
}

export const updateExtraCost = async (data: ExtraCost): Promise<ExtraCost> => {
  const { id, ...extra } = data
  const response = await apiClubSalud.patch(`/extra-cost/${id}`, extra)
  return response.data
}

export const deleteExtraCost = async (id: number): Promise<ExtraCost> => {
  const response = await apiClubSalud.delete(`/extra-cost/${id}`)
  return response.data
}
