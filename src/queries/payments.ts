import axios from 'axios'
import { path } from 'utils/path'
import { type BilledConsultation, type Payment } from 'utils/types'

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
  amount
}): Promise<Payment> => {
  const response = await axios.post(`${path()}/api/payments`, {
    memberId: Number(memberId),
    subscriptionId: Number(subscriptionId),
    amount: Number(amount)
  })
  return response.data
}

export const setPlanPayment = async ({
  amount,
  subscriptionId,
  healthSubscribedPlanId
}): Promise<Payment> => {
  const response = await axios.post(`${path()}/api/planPayments`, {
    subscriptionId: Number(subscriptionId),
    amount: Number(amount),
    healthSubscribedPlanId: Number(healthSubscribedPlanId)
  })
  return response.data
}
