import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type CreateExtraCost, type ExtraCost } from 'utils/ClubSalud/types'

export const getExtraCost = async (): Promise<ExtraCost[]> => {
  const response = await axios.get(`${path()}/api/extraCost`)
  return response.data
}

export const createExtraCost = async (
  data: CreateExtraCost
): Promise<ExtraCost> => {
  const response = await axios.post(`${path()}/api/extraCost`, data)
  return response.data
}

export const updateExtraCost = async (data: ExtraCost): Promise<ExtraCost> => {
  const response = await axios.patch(`${path()}/api/extraCost`, data)
  return response.data
}

export const deleteExtraCost = async (id: number): Promise<ExtraCost> => {
  const response = await axios.delete(`${path()}/api/extraCost`, { data: id })
  return response.data
}
