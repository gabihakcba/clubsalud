import axios from 'axios'

export const setPayment = async ({ memberId, subscriptionId, amount }) => {
  const response = await axios.post('http://localhost:3000/api/payments', {
    memberId: Number(memberId),
    subscriptionId: Number(subscriptionId),
    amount: Number(amount)
  })
  return response.data
}
