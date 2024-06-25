import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { Tag } from 'primereact/tag'
import { getMembers } from 'queries/members'
import { getPromotions } from 'queries/promotions'
import { setSubscription } from 'queries/subscriptions'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreateSubscription } from 'utils/types'

const calculateFinalPrice = (price, discount): number => {
  return price - (price * discount) / 100
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

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (subscription: CreateSubscription) => {
      const subs = await setSubscription(subscription)
      return subs
    },
    onSuccess: (data) => {
      console.log(data)
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
          selectedType
        )
        const total = remaining
        const initialDate = moment().toISOString()
        const expirationDate = moment()
          .add(data.months as moment.DurationInputArg1, 'months')
          .toISOString()
        const subscription: CreateSubscription = {
          date: new Date(),
          paid: false,
          remaining,
          total,
          initialDate: new Date(initialDate),
          expirationDate: new Date(expirationDate),
          remainingClasses,
          promotionId: data.promotion.id,
          memberId: data.memberId
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
          {...register('type', {
            required: true
          })}
          value={selectedType}
          options={[
            { name: 'Mensual', discount: 0 },
            { name: 'Trimestral 15% OFF', discount: 15 },
            { name: 'Semestral 25% OFF', discount: 25 },
            { name: 'Anual 30% OFF', discount: 30 }
          ]}
          optionLabel='name'
          optionValue='discount'
          onChange={(e) => {
            const discount = e.value
            setSelectedType(discount)
            switch (discount) {
              case 0:
                setValue('months', 1)
                break
              case 15:
                setValue('months', 3)
                break
              case 25:
                setValue('months', 6)
                break
              case 30:
                setValue('months', 12)
                break
              default:
                break
            }
          }}
        />
        <label htmlFor=''>Tipo</label>
      </FloatLabel>
      <Tag severity='warning'>
        ${calculateFinalPrice(selectedPromotion?.amountPrice, selectedType)}
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
