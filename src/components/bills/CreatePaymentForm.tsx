'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMembers } from 'queries/members'
import { setParticularPayment, setPlanPayment } from 'queries/payments'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Member, type Payment } from 'utils/types'

const hasSubs = (member): boolean => {
  return member?.memberSubscription.some((subs) => !subs.paid)
}

const selectMember = (members, id: number): Member => {
  return members?.find((member) => member.id === id)
}

const amountByPlan = (members, memberId, planSubsId): number | undefined => {
  const member = selectMember(members, Number(memberId))
  const planSubs = member?.planSubscribed?.find(
    (planSubs) => Number(planSubsId) === planSubs.id
  )
  const amount = planSubs?.plan?.paymentPerConsultation
  return amount
}

const getRemaining = (members, sId, mId): number => {
  const member = members?.find((member) => member.id === mId)
  const subs = member?.memberSubscription?.find((subs) => subs.id === sId)
  return subs?.remaining
}

interface params {
  closeModal: () => void
}
export default function CreatePaymentForm({
  closeModal
}: params): ReactElement {
  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm()

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await getMembers()
      const membersAbleToPaid = res.filter((member) => hasSubs(member))
      return membersAbleToPaid
    }
  })

  const {
    mutate: particularPayment,
    isError: isErrorP,
    isPending: isPendingP,
    isSuccess: isSuccessP
  } = useMutation({
    mutationFn: setParticularPayment,
    onSuccess: async (data: Payment) => {
      await query.refetchQueries({ queryKey: ['members'] })
      query.setQueryData(['payments'], (oldData: Payment[]) => [
        ...oldData,
        data
      ])
      reset()
      closeModal()
    }
  })

  const {
    mutate: planPayment,
    isError: isErrorB,
    isPending: isPendingB,
    isSuccess: isSuccessB
  } = useMutation({
    mutationFn: setPlanPayment,
    onSuccess: async (data: Payment) => {
      await query.refetchQueries({ queryKey: ['members'] })
      query.setQueryData(['billed'], (oldData: Payment[]) => [...oldData, data])
      reset()
      closeModal()
    }
  })

  return (
    <form
      action=''
      className='flex flex-col bg-gray-600 p-4 rounded gap-4'
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        if (data.isbyhealth) {
          planPayment({
            amount: data.amountPlan,
            subscriptionId: data.subscription,
            healthSubscribedPlanId: data.health
          })
        } else {
          particularPayment({
            memberId: data.member,
            subscriptionId: data.subscription,
            amount: data.amountParticular
          })
        }
      })}
    >
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Alumno</label>
        <div>
          <select
            id=''
            {...register('member', {
              required: { value: true, message: 'Campo requerido' }
            })}
          >
            <option value=''>Select</option>
            {members?.map((member, index) => (
              <option
                value={member.id}
                key={index}
              >
                {member.name}
              </option>
            ))}
          </select>
          {errors?.member && (
            <span className='inputError'>
              {errors.member.message as string}
            </span>
          )}
        </div>
      </div>
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Suscripción</label>
        <div>
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

            {selectMember(
              members,
              Number(watch('member'))
            )?.memberSubscription?.map((subs, index) => (
              <option
                value={subs.id}
                key={index}
                className='text-black'
              >
                {subs.promotion?.title}
              </option>
            ))}
          </select>
          {errors?.subscription && (
            <span className='inputError'>
              {errors.subscription.message as string}
            </span>
          )}
        </div>
      </div>
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Pago con obra social</label>
        <input
          type='checkbox'
          defaultChecked={false}
          {...register('isbyhealth')}
        />
      </div>
      {watch('isbyhealth') && (
        <div className='flex w-full justify-between gap-2'>
          <label htmlFor=''>Obra social</label>
          <div>
            <select
              id=''
              {...register('health', {
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
              })}
              onClick={() => {
                setValue(
                  'amountPlan',
                  amountByPlan(members, watch('member'), watch('health'))
                )
              }}
            >
              <option value=''>Select</option>

              {selectMember(
                members,
                Number(watch('member'))
              )?.planSubscribed?.map((planSubs, index) => (
                <option
                  value={planSubs.id}
                  key={index}
                  className='text-black'
                >
                  {planSubs.plan?.name}
                </option>
              ))}
            </select>
            {errors?.health && (
              <span className='inputError'>
                {errors.health.message as string}
              </span>
            )}
          </div>
        </div>
      )}
      <div className='flex w-full justify-between gap-2'>
        <label htmlFor=''>Monto</label>
        {watch('isbyhealth') && (
          <div>
            <input
              type='number'
              id=''
              className='max-w-36 text-right px-2'
              {...register('amountPlan', {
                required: {
                  value: false,
                  message: 'Campo requerido social'
                }
              })}
              disabled
            />
            {errors?.amountPlan && (
              <span className='inputError'>
                {errors.amountPlan.message as string}
              </span>
            )}
          </div>
        )}
        {!watch('isbyhealth') && (
          <div>
            <input
              type='number'
              id=''
              className='max-w-36 text-right px-2'
              {...register('amountParticular', {
                required: {
                  value: !watch('isbyhealth'),
                  message: 'Campo requerido particular'
                }
              })}
            />
            {errors?.amountParticular && (
              <span className='inputError'>
                {errors.amountParticular.message as string}
              </span>
            )}
          </div>
        )}
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
      {(isPendingP || isPendingB) && (
        <span className='text-yellow-400'>Creando...</span>
      )}
      {(isSuccessP || isSuccessB) && (
        <span className='text-green-400'>Listo!</span>
      )}
      {(isErrorP || isErrorB) && (
        <span className='text-yellow-400'>Error!</span>
      )}
    </form>
  )
}
