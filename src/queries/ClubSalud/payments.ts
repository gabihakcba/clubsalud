import { apiClubSalud } from 'utils/axios.service'
import { DateUtils } from 'utils/ClubSalud/dates'
import {
  type CreatePayment,
  type BilledConsultation,
  type Payment
} from 'utils/ClubSalud/types'

export const getPayments = async (): Promise<Payment[]> => {
  const response = await apiClubSalud.get('/payment')
  return response.data
}

export const getBilled = async (): Promise<BilledConsultation[]> => {
  const response = await apiClubSalud.get('/payment-consultation')
  return response.data
}

export const setParticularPayment = async ({
  memberId,
  subscriptionId,
  amount,
  date,
  isCash
}: CreatePayment): Promise<Payment> => {
  const response = await apiClubSalud.post('/payment', {
    memberId: Number(memberId),
    subscriptionId: Number(subscriptionId),
    amount: Number(amount),
    date: DateUtils.toBackendFormat(date),
    isCash
  })
  return response.data
}

export const setPlanPayment = async ({
  amount,
  subscriptionId,
  healthSubscribedPlanId,
  autorizationNumber,
  date
}: {
  amount: number
  subscriptionId: number
  healthSubscribedPlanId: number
  autorizationNumber: string
  date: Date
}): Promise<Payment> => {
  try {
    const response = await apiClubSalud.post('/payment-consultation', {
      subscriptionId: Number(subscriptionId),
      amount: Number(amount),
      healthSubscribedPlanId: Number(healthSubscribedPlanId),
      autorizationNumber: String(autorizationNumber),
      date: DateUtils.toBackendFormat(date)
    })
    return response.data
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export const deleteParticularPayment = async (id: number): Promise<Payment> => {
  const response = await apiClubSalud.delete(`/payment/${id}`)
  return response.data
}

export const deletePlanPayment = async (id: number): Promise<Payment> => {
  const response = await apiClubSalud.delete(`/payment-consultation/${id}`, {
    data: id
  })
  return response.data
}

export const changeMethod = async (
  id: number,
  isCash: boolean
): Promise<Payment> => {
  const response = await apiClubSalud.patch(`/payment/${id}`, { isCash })
  return response.data
}
