import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { duration } from 'moment'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { createInstructorPayment, getInstructorPrice } from 'queries/instructorPayments'
import { getInstructors } from 'queries/instructors'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import {
  type AttendanceInstructor,
  type Instructor,
  type CreateInstructorPayment,
  type InstructorPayment
} from 'utils/types'

const getWorkedHours = (attendances: AttendanceInstructor[]): number => {
  const hours = attendances.reduce((acc, curr) => acc + (curr.class?.duration ?? 0), 0)
  return hours
}

const getInstructor = (id: number, instructors: Instructor[]): Instructor => {
  const index = instructors.findIndex((ins: Instructor) => ins.id === id)
  return instructors[index]
}

const getAttendances = (instructor: Instructor):AttendanceInstructor[] | undefined => {
  const attendances = instructor.attendanceInstructor
  return attendances
}

export default function CreateInstructorPaymentForm(): ReactElement {
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null)

  const query = useQueryClient()

  const { data: instructors, isPending: isLoadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const { data: prices, isPending: isLoadingPrices } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      const prices = await getInstructorPrice()
      console.log(prices)
      return prices
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
      query.setQueryData(['payments'], (oldData: InstructorPayment[]) => [
        ...oldData,
        data
      ])
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

  useEffect(() => {
    if(selectedInstructor && instructors) {
      const instructor = getInstructor(selectedInstructor, instructors)
      const attendances = getAttendances(instructor)
      if(attendances) {
        console.log(getWorkedHours(attendances))
      }
    }
  }, [selectedInstructor])

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
      <FloatLabel>
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
          loading={isLoadingInstructors}
          className='w-full'
        />
        <label htmlFor=''>Profesor</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          type='number'
          {...register('amount', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.amount !== undefined}
        />
        <label htmlFor=''>Cantidad</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          {...register('workedMonth', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.workedMonth !== undefined}
        />
        <label htmlFor=''>Mes trabajado</label>
      </FloatLabel>

      <FloatLabel>
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
      </FloatLabel>

      <FloatLabel>
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
      </FloatLabel>

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
