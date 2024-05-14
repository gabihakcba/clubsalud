import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { createInstructorPayment } from 'queries/instructorPayments'
import { getInstructors } from 'queries/instructors'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import {
  type CreateInstructorPayment,
  type InstructorPayment
} from 'utils/types'

export default function CreateInstructorPaymentForm(): ReactElement {
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null)

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
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  return (
    <form
      className='flex flex-column gap-4 pt-4'
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
      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('amount', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.amount !== undefined}
        />
        <label htmlFor=''>Cantidad</label>
      </div>
      <div className='p-float-label'>
        <Calendar
          {...register('workedMonth', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.workedMonth !== undefined}
        />
        <label htmlFor=''>Mes trabajado</label>
      </div>
      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('workedHours', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.workedHours !== undefined}
        />
        <label htmlFor=''>Horas trabajadas</label>
      </div>
      <div className='p-float-label'>
        <Calendar
          {...register('paymentDate', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.paymentDate !== undefined}
        />
        <label htmlFor=''>Fecha de pago</label>
      </div>
      <div className='p-float-label'>
        <Dropdown
          options={instructors}
          value={selectedInstructor}
          optionLabel='name'
          optionValue='id'
          {...register('instructor', {
            required: { value: true, message: 'Campo requerido' }
          })}
          filter
          invalid={errors?.instructorId !== undefined}
          onChange={(e) => {
            setSelectedInstructor(e.value)
            setValue('instructorId', e.value)
          }}
          className='w-full'
        />
        <label htmlFor=''>Profesor</label>
      </div>
      <Button
        loading={isPending}
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
      />
      {isSuccess && <small className='text-sm text-green-600'>Listo!</small>}
      {isPending && (
        <small className='text-sm text-yellow-600'>Creando...</small>
      )}
      {isError && <small className='text-sm text-red-600'>Error!</small>}
    </form>
  )
}
