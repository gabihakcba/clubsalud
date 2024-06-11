import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { getMembers } from 'queries/members'
import { getPromotions } from 'queries/promotions'
import { setSubscription } from 'queries/subscriptions'
import { useState, type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type Promotion } from 'utils/types'

export default function SubscriptionForm(): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)

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
    mutationFn: async ({
      id,
      promotion
    }: {
      id: string
      promotion: FieldValues
    }) => {
      const memberId = Number(id)
      const subs = await setSubscription({
        memberId,
        promotion: promotion as Promotion
      })
      if (!subs) {
        alert('No se pudo adherir a la suscripción')
      }
    },
    onSuccess: () => {
      alert('Inscipción hecha')
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
        subscribe({
          id: data.memberId as string,
          promotion: data.promotion
        })
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
