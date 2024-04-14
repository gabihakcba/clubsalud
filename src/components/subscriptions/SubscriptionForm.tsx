import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/members'
import { getPromotions } from 'queries/promotions'
import { setSubscription } from 'queries/subscriptions'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'

const subscribe = async (id: string, promotion, closeModal): Promise<void> => {
  const memberId = Number(id)
  const subs = await setSubscription({
    memberId,
    promotion
  })
  if (!subs) {
    alert('No se pudo adherir a la suscripción')
  }
  closeModal()
}

interface params {
  closeModal: () => void
}
export default function SubscriptionForm({ closeModal }: params): ReactElement {
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
    handleSubmit
    // formState: { errors },
    // watch
  } = useForm()

  return (
    <div className='text-white rounded bg-gray-800 p-4'>
      <h2>Crear subscription</h2>
      <form
        action=''
        id='subs'
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault()

          void (
            promotions !== undefined &&
            subscribe(
              data.memberId as string,
              promotions[data.promotion],
              closeModal
            )
          )
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
            {members?.map((member, index) => (
              <option
                value={member.id}
                key={index}
              >
                {member.name}
              </option>
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
                <option
                  value={index}
                  key={index}
                >
                  {promotion.title} - ${promotion.amountPrice}
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
