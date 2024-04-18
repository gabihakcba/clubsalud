import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEmployeePayment } from 'queries/employeePayments'
import { getEmployees } from 'queries/employees'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type EmployeePayment, type CreateEmployeePayment } from 'utils/types'

interface params {
  closeModal: () => void
}
export default function CreateEmployeePaymentForm({
  closeModal
}: params): ReactElement {
  const query = useQueryClient()

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getEmployees()
    }
  })

  const { mutate: create } = useMutation({
    mutationFn: createEmployeePayment,
    onSuccess: (data) => {
      query.setQueryData(['employeePayments'], (oldData: EmployeePayment[]) => [
        ...oldData,
        data
      ])
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
        const parsed: CreateEmployeePayment = {
          amount: Number(data.amount),
          monthPayment: data.monthPayment,
          date: data.date,
          employeeId: Number(data.employeeId)
        }
        if (data.hoursWorked !== '') {
          parsed.hoursWorked = Number(data.hoursWorked)
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
          <label htmlFor=''>Mes pagado</label>
          <input
            type='date'
            className='border-2 rounded'
            {...register('monthPayment', {
              required: { value: true, message: 'Campo requerido' }
            })}
          />
        </div>
        {errors?.monthPayment && (
          <span className='text-sm text-red-600'>
            {errors?.monthPayment.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Horas trabajadas</label>
          <input
            type='number'
            className='border-2 rounded text-end'
            {...register('hoursWorked')}
          />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Fecha de pago</label>
          <input
            type='date'
            className='border-2 rounded'
            {...register('date', {
              required: { value: true, message: 'Campo requerido' }
            })}
          />
        </div>
        {errors?.date && (
          <span className='text-sm text-red-600'>
            {errors?.date.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-4 justify-between items-center'>
          <label htmlFor=''>Empleado</label>
          <select
            className='border-2 rounded'
            {...register('employeeId', {
              required: { value: true, message: 'Campo requerido' }
            })}
          >
            {employees?.map((employee, index) => (
              <option
                key={index}
                value={employee.id}
              >
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        {errors?.employeeId && (
          <span className='text-sm text-red-600'>
            {errors?.employeeId.message as string}
          </span>
        )}
      </div>
      <div className='w-full'>
        <button className='blueButtonForm p-1 w-full'>Enviar</button>
      </div>
    </form>
  )
}
