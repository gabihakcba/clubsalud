import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createInstructorPayment } from 'queries/instructorPayments'
import { getInstructors } from 'queries/instructors'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import {
  type CreateInstructorPayment,
  type InstructorPayment
} from 'utils/types'

interface params {
  closeModal: () => void
}
export default function CreateInstructorPaymentForm({
  closeModal
}: params): ReactElement {
  const query = useQueryClient()

  const { data: instructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createInstructorPayment,
    onSuccess: (data) => {
      console.log(data)
      query.setQueryData(
        ['instructorPayments'],
        (oldData: InstructorPayment[]) => [...oldData, data]
      )
      reset()
      setTimeout(closeModal, 250)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  return (
    <form
      className='flex flex-col bg-white rounded p-4 gap-2'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        const parsed: CreateInstructorPayment = {
          amount: Number(data.amount),
          workedMonth: data.workedMonth,
          paymentDate: data.paymentDate,
          instructorId: Number(data.instructorId),
          workedHours: Number(data.workedHours)
        }
        create(parsed)
      })}
    >
      <h3 className='text-xl font-bold text-center'>Generar Pago</h3>
      <hr className='m-2' />
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Cantidad</label>
          <input
            type='number'
            className='border-2 rounded text-end'
            {...register('amount', {
              required: { value: true, message: 'Campo requerido' }
            })}
          />
        </div>
        {errors?.amount && (
          <span className='text-sm text-red-600'>
            {errors?.amount.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Mes trabajado</label>
          <input
            type='date'
            className='border-2 rounded'
            {...register('workedMonth', {
              required: { value: true, message: 'Campo requerido' }
            })}
          />
        </div>
        {errors?.workedMonth && (
          <span className='text-sm text-red-600'>
            {errors?.workedMonth.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Horas trabajadas</label>
          <input
            type='number'
            className='border-2 rounded text-end'
            {...register('workedHours', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
          />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Fecha de pago</label>
          <input
            type='date'
            className='border-2 rounded'
            {...register('paymentDate', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
          />
        </div>
        {errors?.paymentDate && (
          <span className='text-sm text-red-600'>
            {errors?.paymentDate.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Profesor</label>
          <select
            className='border-2 rounded'
            {...register('instructorId', {
              required: { value: true, message: 'Campo requerido' }
            })}
          >
            {instructors?.map((instructor, index) => (
              <option
                key={index}
                value={instructor.id}
              >
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        {errors?.instructorId && (
          <span className='text-sm text-red-600'>
            {errors?.instructorId.message as string}
          </span>
        )}
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <button
          className='blueButtonForm p-1 w-full disabled:bg-black'
          disabled={isPending}
        >
          Enviar
        </button>
        {isSuccess && <span className='text-sm text-green-600'>Listo!</span>}
        {isPending && (
          <span className='text-sm text-yellow-600'>Creando...</span>
        )}
        {isError && <span className='text-sm text-red-600'>Error!</span>}
      </div>
    </form>
  )
}
