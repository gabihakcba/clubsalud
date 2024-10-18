'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { Tag } from 'primereact/tag'
import { getMembers } from 'queries/members'
import { getPromotions } from 'queries/promotions'
import { setSubscription } from 'queries/subscriptions'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { argAddMonths, argDate } from 'utils/dates'
import { getPlan } from 'queries/plan'
import { type Plan, type CreateSubscription } from 'utils/types'

const calculateFinalPriceMonth = (price, plan: Plan): number => {
  return (price - (price * plan?.discountPercent) / 100)
}

const calculateFinalPrice = (price, plan: Plan): number => {
  return (price - (price * plan?.discountPercent) / 100) * plan?.durationMonth
}

export default function SubscriptionForm(): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<any>(null)

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['memS'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { data: promotions, isPending: loadingPromotions } = useQuery({
    queryKey: ['promS'],
    queryFn: async () => {
      return await getPromotions()
    }
  })

  const { data: offers, isPending: loadingOffers } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      return await getPlan()
    }
  })

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (subscription: CreateSubscription) => {
      const subs = await setSubscription(subscription)
      return subs
    },
    onSuccess: (data) => {
      alert('Inscipción hecha')
    },
    onError: () => {
      alert('No se pudo adherir a la suscripción')
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  return (
    <form
      action=''
      id='subs'
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        const week = data.promotion.amountWeeklyClasses
        const month = week * 4

        const remainingClasses = month * data.months
        const remaining = calculateFinalPrice(
          selectedPromotion?.amountPrice,
          selectedType as Plan
        )
        const total = remaining
        const initialDate = argDate()
        const expirationDate = argAddMonths(initialDate, data.months as number)
        const subscription: CreateSubscription = {
          date: argDate(),
          paid: false,
          remaining,
          total,
          initialDate,
          expirationDate,
          remainingClasses,
          promotionId: data.promotion.id,
          memberId: data.memberId,
          active: true,
          planId: selectedType.id
        }
        subscribe(subscription)
      })}
    >
      <li className='p-float-label'>
        <Dropdown
          options={members}
          value={selectedMember}
          optionLabel='name'
          optionValue='id'
          filter
          {...register('memberName', {
            required: {
              value: true,
              message: 'Este campo es requerido'
            }
          })}
          loading={loadingMembers}
          invalid={errors?.name !== undefined}
          className='w-full'
          onChange={(e) => {
            setSelectedMember(e.value)
            setValue('memberId', e.value)
          }}
        />
        <label htmlFor='name'>Alumno</label>
      </li>

      <li className='p-float-label'>
        <Dropdown
          options={promotions}
          value={selectedPromotion}
          optionLabel='title'
          {...register('promotionName', {
            required: {
              value: true,
              message: 'Este campo es requerido'
            }
          })}
          onChange={(e) => {
            setSelectedPromotion(e.value)
            setValue('promotion', e.value)
          }}
          loading={loadingPromotions}
          className='w-full'
          invalid={errors?.title !== undefined}
        />
        <label htmlFor='promotionName'>Plan </label>
      </li>
      <FloatLabel>
        <Dropdown
          options={offers}
          value={selectedType}
          optionLabel='title'
          {...register('type', {
            required: true
          })}
          onChange={(e) => {
            setSelectedType(e.value)
            setValue('months', e.value.durationMonth)
          }}
          loading={loadingOffers}
          className='w-full'
          invalid={errors?.type !== undefined}
        />
        <label htmlFor=''>Oferta</label>
      </FloatLabel>
      <Tag severity='warning'>
        Por mes ${calculateFinalPriceMonth(selectedPromotion?.amountPrice, selectedType as Plan)}
      </Tag>
      <Tag severity='danger'>
        Total ${calculateFinalPrice(selectedPromotion?.amountPrice, selectedType as Plan)}
      </Tag>
      <Button
        type='submit'
        label='Enviar'
        className='w-full'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPending}
      />
    </form>
  )
}
