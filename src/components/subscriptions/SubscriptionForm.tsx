import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/members'
import { getPromotions } from 'queries/promotions'
import { setSubscription } from 'queries/subscriptions'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Promotion } from 'utils/types'

const subscribe = async (id: string, promotion) => {
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
  const { data: members } = useQuery({
    queryKey: ['memS'],
    queryFn: async () => {
      const response = await getMembers()
      return response.data
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
    formState: { errors },
    watch
  } = useForm()

  return (
    <div className='text-white rounded bg-gray-800 p-4'>
      <h2>Crear subscription</h2>
      <form
        action=''
        id='subs'
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault()

          promotions !== undefined &&
            subscribe(data.memberId, promotions[data.promotion])
        })}
      >
        <div>
          <label htmlFor=''>Alumno</label>
          <select
            {...register('memberId', {
              required: {
                value: true,
                message: 'Este campo es requerido'
              }
            })}
            className='text-black'
          >
            <option value=''>Select</option>
            {members?.map((member) => (
              <option value={member.id}>{member.name}</option>
            ))}
          </select>
          <label
            htmlFor=''
            className='ml-2'
          >
            Plan{' '}
          </label>
          <select
            {...register('promotion', {
              required: {
                value: true,
                message: 'Este campo es requerido'
              }
            })}
            className='text-black'
          >
            <option value=''>Select</option>
            {promotions?.map((promotion, index) => {
              return (
                <option value={index}>
                  {index} - {promotion.title} - ${promotion.amountPrice}
                </option>
              )
            })}
          </select>
          <button
            type='submit'
            className='blueButtonForm p-1 ml-1'
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
