import axios from 'axios'
import { path } from 'utils/path'
import { type Payment } from 'utils/types'

export const getPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(`${path()}/api/payments`)
  return response.data
}

export const setPayment = async ({
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
