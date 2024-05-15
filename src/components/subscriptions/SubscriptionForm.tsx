import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { getMembers } from 'queries/members'
import { getPromotions } from 'queries/promotions'
import { setSubscription } from 'queries/subscriptions'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'

const subscribe = async (id: string, promotion): Promise<void> => {
  const memberId = Number(id)
  const subs = await setSubscription({
    memberId,
    promotion
  })
  if (!subs) {
    alert('No se pudo adherir a la suscripción')
  }
}

export default function SubscriptionForm(): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(0)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)

  const { data: members } = useQuery({
    queryKey: ['memS'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { data: promotions } = useQuery({
    queryKey: ['promS'],
    queryFn: async () => {
      return await getPromotions()
    }
  })

  const {
    register,
    handleSubmit,
    setValue
    // formState: { errors },
    // watch
  } = useForm()

  return (
    <form
      action=''
      id='subs'
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        void subscribe(data.memberId as string, data.promotion)
      })}
    >
      <li className='p-float-label'>
        <Dropdown
          options={members}
          value={selectedMember ?? null}
          optionLabel='name'
          optionValue='id'
          filter
          {...register('memberName', {
            required: {
              value: true,
              message: 'Este campo es requerido'
            }
          })}
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
        />
        <label htmlFor='promotionName'>Plan </label>
      </li>
      <Button
        type='submit'
        label='Enviar'
        className='w-full'
        icon='pi pi-upload'
        iconPos='right'
      />
    </form>
  )
}
