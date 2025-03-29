'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { Tag } from 'primereact/tag'
import { getMembers } from 'queries/ClubSalud/members'
import { getPromotions } from 'queries/ClubSalud/promotions'
import { setSubscription } from 'queries/ClubSalud/subscriptions'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { argAddMonths, argDate } from 'utils/ClubSalud/dates'
import { getPlan } from 'queries/ClubSalud/plan'
import {
  type Plan,
  type CreateSubscription,
  type Member
} from 'utils/ClubSalud/types'
import { Checkbox } from 'primereact/checkbox'
import { type AxiosError } from 'axios'

const calculateFinalPriceMonth = (price, plan: Plan): number => {
  return price - (price * plan?.discountPercent) / 100
}

const calculateFinalPrice = (price, plan: Plan): number => {
  return (price - (price * plan?.discountPercent) / 100) * plan?.durationMonth
}

export default function SubscriptionForm(): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<any>(null)
  const [isByOS, setIsByOS] = useState<boolean>(true)

  const query = useQueryClient()

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
    onSuccess: async (data) => {
      alert('Inscipción hecha')
      await query.refetchQueries({ queryKey: ['members'] })
    },
    onError: (e: AxiosError) => {
      if (e.status === 302) {
        alert('Ya existe una suscripción para este alumno')
      } else {
        alert('No se pudo adherir a la suscripción')
      }
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const optionMemberTemplate = (member: Member): ReactElement => {
    return (
      <div className='flex align-items-center'>
        <div>{`${member?.name} ${member?.dni}`}</div>
      </div>
    )
  }

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
          planId: selectedType.id,
          isByOS
        }
        subscribe(subscription)
      })}
    >
      <li className='p-float-label'>
        <Dropdown
          options={members}
          value={selectedMember}
          optionValue='id'
          itemTemplate={optionMemberTemplate}
          optionLabel='name'
          filter
          filterBy='dni,name,account.username'
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
      <div className='flex gap-2'>
        <label htmlFor=''>Agregar cobros de Obra Social</label>
        <Checkbox
          checked={isByOS}
          onChange={(e) => {
            setIsByOS((prevValue) => !prevValue)
          }}
        />
      </div>
      <Tag severity='warning'>
        Por mes $
        {calculateFinalPriceMonth(
          selectedPromotion?.amountPrice,
          selectedType as Plan
        )}
      </Tag>
      <Tag severity='danger'>
        Total $
        {calculateFinalPrice(
          selectedPromotion?.amountPrice,
          selectedType as Plan
        )}
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
