import { apiClubSalud } from 'utils/axios.service'
import { type CreateCashAudit, type CashAudit } from 'utils/ClubSalud/types'

export const getAllAudit = async (): Promise<CashAudit[]> => {
  const response = await apiClubSalud.get('/cash-register/audit')
  return response.data
}

export const getCash = async (): Promise<number> => {
  const response = await apiClubSalud.get('/cash-register/audit/teoricalCash')
  return response.data
}

export const createAudit = async (
  data: CreateCashAudit
): Promise<CashAudit> => {
  try {
    const response = await apiClubSalud.post('/cash-register/audit', data)
    return response.data
  } catch (error) {
    throw new Error()
  }
}
