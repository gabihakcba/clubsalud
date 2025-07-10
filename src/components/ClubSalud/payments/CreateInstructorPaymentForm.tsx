import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import {
  createInstructorPayment,
  getInstructorPrice
} from 'queries/ClubSalud/instructorPayments'
import { getInstructors } from 'queries/ClubSalud/instructors'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import {
  type AttendanceInstructor,
  type Instructor,
  type CreateInstructorPayment,
  type InstructorPrice
} from 'utils/ClubSalud/types'

const getInstructor = (id: number, instructors: Instructor[]): Instructor => {
  const index = instructors.findIndex((ins: Instructor) => ins.id === id)
  return instructors[index]
}

const getInstructorPayment = (
  instructor: Instructor,
  date,
  setWorkedHours,
  setAmount,
  setValue,
  price: {
    degree: number
    nodegree: number
  }
): void => {
  const attendances: AttendanceInstructor[] | undefined =
    instructor.AttendanceInstructor?.filter(
      (att: AttendanceInstructor) =>
        moment(att.date).month() === moment(date as Date).month() &&
        moment(att.date).year() === moment(date as Date).year()
    )
  const hours = attendances?.reduce((acc, curr) => curr.hours + acc, 0)
  setWorkedHours(hours)
  const payment = instructor.degree
    ? (hours ?? 0) * price.degree
    : (hours ?? 0) * price.nodegree
  setAmount(payment)

  setValue('workedMonth', moment(date as Date).toDate())
  setValue('workedHours', hours)
  setValue('amount', payment)
}

export default function CreateInstructorPaymentForm(): ReactElement {
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(
    null
  )
  const [price, setPrice] = useState<{
    degree: number
    nodegree: number
  }>({ degree: 0, nodegree: 0 })
  const [date, setDate] = useState<any>(null)
  const [workedHours, setWorkedHours] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const query = useQueryClient()

  const { data: instructors, isPending: isLoadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const { data: prices } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      return await getInstructorPrice()
    }
  })

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createInstructorPayment,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['payments'] })
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
    if (selectedInstructor && instructors && prices && date) {
      const instructor = getInstructor(selectedInstructor, instructors)
      getInstructorPayment(
        instructor,
        date,
        setWorkedHours,
        setAmount,
        setValue,
        price
      )
    }
  }, [selectedInstructor, date, price])

  useEffect(() => {
    if (prices) {
      const degreePrice = prices.filter(
        (price: InstructorPrice) => price.active && price.degree
      )
      const nodegreePrice = prices.filter(
        (price: InstructorPrice) => price.active && !price.degree
      )
      setPrice({
        degree: degreePrice[0]?.amount,
        nodegree: nodegreePrice[0]?.amount
      })
    }
  }, [prices])

  return (
    <form
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        const parsed: CreateInstructorPayment = {
          amount: Number(data.amount),
          workedMonth: new Date(data.workedMonth as string),
          paymentDate: new Date(data.paymentDate as string),
          instructorId: Number(data.instructorId),
          workedHours: Number(data.workedHours),
          pricePerHoour: getInstructor(
            selectedInstructor ?? 0,
            instructors ?? []
          ).degree
            ? price.degree
            : price.nodegree
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
          filterBy='dni,name'
          invalid={errors?.instructorId !== undefined}
          onChange={(e) => {
            setSelectedInstructor(e.value as number)
            setValue('instructorId', e.value)
          }}
          loading={isLoadingInstructors}
          className='w-full'
        />
        <label htmlFor=''>Profesor</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          {...register('workedMonth', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.workedMonth !== undefined}
          value={date}
          onChange={(e) => {
            setDate(e.value)
          }}
          view='month'
          dateFormat='mm/yy'
        />
        <label htmlFor=''>Mes trabajado</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          value={workedHours}
          type='number'
          {...register('workedHours', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          onChange={(e) => {
            setWorkedHours(e.target.value)
          }}
          invalid={errors?.workedHours !== undefined}
        />
        <label htmlFor=''>Horas trabajadas</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          value={amount}
          type='number'
          {...register('amount', {
            required: { value: true, message: 'Campo requerido' }
          })}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          invalid={errors?.amount !== undefined}
        />
        <label htmlFor=''>Cantidad</label>
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
