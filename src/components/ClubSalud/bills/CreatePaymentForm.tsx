'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { getMembers } from 'queries/ClubSalud/members'
import { setParticularPayment, setPlanPayment } from 'queries/ClubSalud/payments'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Subscription, type Member, type Payment } from 'utils/ClubSalud/types'

const hasSubs = (member: Member): boolean => {
  const subs: Subscription[] | undefined = member?.memberSubscription

  return (
    subs !== undefined &&
    (subs.some((sub) => {
      const bills = sub.billedConsultation?.length
      return bills !== undefined && bills < 2
    }) ||
      subs.some((sub) => !sub.paid))
  )
}

const selectMember = (members, id: number): Member => {
  const member = members?.find((member) => member.id === id)
  return member
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

export default function CreatePaymentForm(): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [plansMemberSelected, setPlansMemberSelected] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)
  const [ishealth, setIshealth] = useState<boolean>(false)
  const [amountToPay, setAmountToPay] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate())

  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm()

  const { data: members, isPending: isPendingMembers } = useQuery({
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
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['members'] })
      await query.refetchQueries({ queryKey: ['payments'] })
      await query.refetchQueries({ queryKey: ['billed'] })
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
      await query.refetchQueries({ queryKey: ['payments'] })
      await query.refetchQueries({ queryKey: ['billed'] })
    }
  })

  useEffect(() => {
    setValue('date', moment().toDate())
  }, [])

  return (
    <form
      action=''
      className='flex flex-column pt-4 gap-4'
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        if (ishealth) {
          planPayment({
            amount: data.amountPlan,
            subscriptionId: data.subscriptionId,
            healthSubscribedPlanId: data.healthId,
            autorizationNumber: data.autorizationNumber,
            date: data.date
          })
        } else {
          particularPayment({
            memberId: data.memberId,
            subscriptionId: data.subscriptionId,
            amount: data.amountParticular,
            date: data.date
          })
        }
      })}
    >
      <div className='p-float-label'>
        <Dropdown
          filterBy='dni'
          options={members}
          value={selectedMember}
          optionLabel='name'
          optionValue='id'
          {...register('member', {
            required: { value: true, message: 'Campo requerido' }
          })}
          onChange={(e) => {
            setSelectedMember(e.value)
            setValue('memberId', e.value)
            setPlansMemberSelected(
              selectMember(members, Number(watch('memberId')))
                ?.planSubscribed ?? []
            )
          }}
          className='w-full'
          invalid={errors?.member !== undefined}
          loading={isPendingMembers}
          filter
        />
        <label htmlFor='member'>Alumno</label>
      </div>
      <div className='p-float-label'>
        <Dropdown
          options={selectMember(
            members,
            Number(watch('memberId'))
          )?.memberSubscription?.filter((subs: Subscription) => {
            if (ishealth) {
              const bills = subs.billedConsultation?.length
              return bills !== undefined && bills < subs.plan.durationMonth * 2
            } else {
              return !subs.paid
            }
          })}
          value={selectedSubscription}
          optionLabel='promotion.title'
          optionValue='id'
          {...register('subscription', {
            required: { value: true, message: 'Campo requerido' }
          })}
          onChange={(e) => {
            setSelectedSubscription(e.value)
            setValue('subscriptionId', e.value)
          }}
          loading={selectedMember === null}
          className='w-full'
          invalid={errors?.subscription !== undefined}
        />
        <label htmlFor='subscription'>Suscripción</label>
      </div>
      <div className='flex gap-4'>
        <label htmlFor='isbyhealth'>Pago con obra social</label>
        <Checkbox
          checked={ishealth}
          value={ishealth}
          {...register('isbyhealth')}
          onChange={(e) => {
            setIshealth(Boolean(e.checked))
          }}
          onBlur={() => {}} /** Do not remove this line, make no fail Checkbox with {...register} */
        />
      </div>
      {ishealth && (
        <>
          <div className='p-float-label'>
            <Dropdown
              id='health'
              {...register('health', {
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
              })}
              className='w-full'
              value={selectedPlan}
              options={plansMemberSelected}
              optionLabel='plan.name'
              optionValue='id'
              onChange={(e) => {
                setSelectedPlan(e.value)
                setValue('healthId', e.value)
                setValue(
                  'amountPlan',
                  amountByPlan(members, getValues('memberId'), e.value)
                )
                setAmountToPay(
                  amountByPlan(members, getValues('memberId'), e.value) ?? 0
                )
              }}
            />
            <label htmlFor='health'>Obra social</label>
          </div>
          <FloatLabel>
            <InputText
              {...register('autorizationNumber', { required: true })}
              invalid={errors.autorizationNumber !== undefined}
            />
            <label htmlFor=''>Número de autorización</label>
          </FloatLabel>
        </>
      )}
      <div className='p-float-label'>
        {ishealth && (
          <InputText
            type='number'
            id='amountPlan'
            {...register('amountPlan')}
            value={String(amountToPay)}
            disabled
            invalid={errors?.amountPlan !== undefined}
          />
        )}
        {!ishealth && (
          <InputText
            type='number'
            id='amountParticular'
            {...register('amountParticular', {
              required: {
                value: ishealth,
                message: 'Campo requerido particular'
              }
            })}
            invalid={errors?.amountParticular !== undefined}
          />
        )}
        <label htmlFor=''>Monto</label>
      </div>
      <FloatLabel>
        <Calendar
          {...register('date', {
            required: true
          })}
          invalid={errors?.date !== undefined}
          value={selectedDate}
          onChange={(e) => {
            console.log(e.value)
            setValue('date', moment(e.value).toDate())
            setSelectedDate(moment(e.value).toDate())
          }}
          dateFormat='dd/mm/yy'
        />
        <label htmlFor=''>Fecha</label>
      </FloatLabel>
      <div className='p-float-label'>
        <InputText
          value={String(
            getRemaining(
              members,
              Number(getValues('subscriptionId')),
              Number(getValues('memberId'))
            )
          )}
          disabled
        />

        <label htmlFor=''>Faltante</label>
      </div>
      <Button
        className='blueButtonForm'
        type='submit'
        label='Generar Pago'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPendingP || isPendingB}
      />
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
