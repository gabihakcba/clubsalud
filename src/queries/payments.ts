import axios from 'axios'
import { path } from 'utils/path'
import { type Payment } from 'utils/types'

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
