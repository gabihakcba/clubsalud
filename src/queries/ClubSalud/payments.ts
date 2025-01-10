import axios from 'axios'
import { path } from 'utils/ClubSalud/path'
import { type BilledConsultation, type Payment } from 'utils/ClubSalud/types'

export const getPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(`${path()}/api/payments`)
  return response.data
}

export const getBilled = async (): Promise<BilledConsultation[]> => {
  const response = await axios.get(`${path()}/api/planPayments`)
  return response.data
}

export const setParticularPayment = async ({
  memberId,
  subscriptionId,
  amount,
  date
}): Promise<Payment> => {
  const response = await axios.post(`${path()}/api/payments`, {
    memberId: Number(memberId),
    subscriptionId: Number(subscriptionId),
    amount: Number(amount),
    date
  })
  return response.data
}

export const setPlanPayment = async ({
  amount,
  subscriptionId,
  healthSubscribedPlanId,
  autorizationNumber,
  date
}): Promise<Payment> => {
  const response = await axios.post(`${path()}/api/planPayments`, {
    subscriptionId: Number(subscriptionId),
    amount: Number(amount),
    healthSubscribedPlanId: Number(healthSubscribedPlanId),
    autorizationNumber: String(autorizationNumber),
    date
  })
  return response.data
}

export const deleteParticularPayment = async (id: number): Promise<Payment> => {
  const response = await axios.delete(`${path()}/api/payments`, { data: id })
  return response.data
}

export const deletePlanPayment = async (id: number): Promise<Payment> => {
  const response = await axios.delete(`${path()}/api/planPayments`, { data: id })
  return response.data
}
