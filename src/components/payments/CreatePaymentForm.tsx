import { useMutation, useQuery } from '@tanstack/react-query'
import { setPayment } from 'queries/payments'
import { getPromotions } from 'queries/promotions'
import { getSubscriptions } from 'queries/subscriptions'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

const hasSubs = (member) => {
  return member?.memberSubscription.some((subs) => !subs.paid)
}

const selectMember = (members, id) => {
  const member = members?.find((member) => member.id === id)
  return member?.memberSubscription?.filter((subs) => !subs.paid)
}

const namePromotion = (promotions, id) => {
  const prom = promotions?.find((prom) => prom.id === id)
  return prom.title
}

const getRemaining = (members, sId, mId) => {
  const member = members?.find((member) => member.id === mId)
  const subs = member?.memberSubscription?.find((subs) => subs.id === sId)
  return subs?.remaining
}

export default function CreatePaymentForm({ closeModal }): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const { data: members } = useQuery({
    queryKey: ['memSus'],
    queryFn: async () => {
      const members = await getSubscriptions()
      const membersAbleToPaid = members.filter((member) => hasSubs(member))
      return membersAbleToPaid
    }
  })

  const { data: promotions } = useQuery({
    queryKey: ['promo'],
    queryFn: async () => {
      const promotions = await getPromotions()
      return promotions
    }
  })

  const { mutate } = useMutation({
    mutationFn: setPayment,
    onSuccess: closeModal
  })

  return (
    <form
      action=''
      className='flex flex-col bg-gray-600 p-4 rounded gap-4'
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        mutate({
          memberId: data.member,
          subscriptionId: data.subscription,
          amount: data.amount
        })
      })}
    >
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Alumno</label>
        <select
          id=''
          {...register('member', {
            required: { value: true, message: 'Campo requerido' }
          })}
        >
          <option value=''>Select</option>
          {members?.map((member) => (
            <option value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Suscripción</label>
        <select
          id=''
          {...register('subscription', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
        >
          <option value=''>Select</option>

          {selectMember(members, Number(watch('member')))?.map((subs) => (
            <option value={subs.id}>
              {namePromotion(promotions, subs.promotionId)}
            </option>
          ))}
        </select>
      </div>
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Monto</label>
        <input
          type='number'
          id=''
          className='max-w-36'
          {...register('amount', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
        />
      </div>
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Faltante</label>
        <p>
          {getRemaining(
            members,
            Number(watch('subscription')),
            Number(watch('member'))
          )}
        </p>
      </div>
      <button
        className='blueButtonForm'
        type='submit'
      >
        Generar Pago
      </button>
    </form>
  )
}