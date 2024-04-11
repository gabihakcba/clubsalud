import { useMutation } from '@tanstack/react-query'
import { createHealthPlan } from 'queries/health'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreateHealthPlan } from 'utils/types'
import { HealthPlanType } from 'utils/types'

const plansOptions = (): ReactElement[] => {
  const op: ReactElement[] = []
  for (const plan in HealthPlanType) {
    op.push(<option value={plan}>{plan}</option>)
  }
  return op
}

export default function HealthCreateForm(): ReactElement {
  const { mutate } = useMutation({ mutationFn: createHealthPlan })
  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm()
  return (
    <form
      action=''
      className='w-full h-full bg-white p-2 rounded gap-2 flex flex-col'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        mutate(data as CreateHealthPlan)
      })}
    >
      <h2 className='self-center mt-2'>Crear Obra Social</h2>
      <hr className='my-2' />
      <div className='flex gap-2 justify-between'>
        <label htmlFor=''>Nombre</label>
        <input
          type='text'
          className='border rounded border-black pl-2'
          {...register('name', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
        />
      </div>
      <div className='flex gap-2 justify-between'>
        <label htmlFor=''>Descripción</label>
        <input
          type='text'
          className='border rounded border-black pl-2'
          {...register('description')}
        />
      </div>
      <div className='flex gap-2 justify-between'>
        <label
          htmlFor=''
          className='grow'
        >
          Tipo
        </label>
        <select
          id=''
          className='grow'
          {...register('type', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
        >
          {plansOptions()}
        </select>
      </div>
      <div className='flex gap-2 justify-between'>
        <label htmlFor=''>Pago por consulta</label>
        <input
          type='number'
          className='border rounded border-black pl-2'
          {...register('paymentPerConsultation', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
        />
      </div>
      <button className='blueButtonForm'>Enviar</button>
    </form>
  )
}
