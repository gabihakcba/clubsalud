import axios from 'axios'
import { type Payment } from 'utils/types'

export const setPayment = async ({
  memberId,
  subscriptionId,
  amount
}): Promise<Payment> => {
  const response = await axios.post('http://localhost:3000/api/payments', {
    memberId: Number(memberId),
    subscriptionId: Number(subscriptionId),
    amount: Number(amount)
  })
  return response.data
}
