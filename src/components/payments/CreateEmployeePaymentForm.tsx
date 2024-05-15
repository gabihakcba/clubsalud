import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { createEmployeePayment } from 'queries/employeePayments'
import { getEmployees } from 'queries/employees'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type EmployeePayment, type CreateEmployeePayment } from 'utils/types'
import { FloatLabel } from 'primereact/floatlabel'

interface params {
  closeModal: () => void
}
export default function CreateEmployeePaymentForm({
  closeModal
}: params): ReactElement {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const query = useQueryClient()

  const { data: employees, isPending: loadingEmployees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getEmployees()
    }
  })

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
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
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        const parsed: CreateEmployeePayment = {
          amount: Number(data.amount),
          monthPayment: data.monthPayment,
          date: data.date,
          employeeId: Number(selectedEmployee)
        }
        if (data.hoursWorked !== '') {
          parsed.hoursWorked = Number(data.hoursWorked)
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
        <label htmlFor='amount'>Cantidad</label>
      </div>
      <FloatLabel>
        <Calendar
          {...register('monthPayment', {
            required: { value: true, message: 'Campo requerido' }
          })}
          inputId='monthPayment'
          invalid={errors?.monthPayment !== undefined}
        />
        <label htmlFor='monthPayment'>Mes pagado</label>
      </FloatLabel>
      <div className='p-float-label'>
        <InputText
          type='number'
          className='border-2 rounded text-end'
          {...register('hoursWorked')}
        />
        <label htmlFor='hoursWorked'>Horas trabajadas</label>
      </div>
      <div className='p-float-label'>
        <Calendar
          {...register('date', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.date !== undefined}
        />
        <label htmlFor='date'>Fecha de pago</label>
      </div>
      <div className='p-float-label'>
        <Dropdown
          className='w-full'
          options={employees}
          optionLabel='name'
          optionValue='id'
          loading={loadingEmployees}
          filter
          value={selectedEmployee}
          onChange={(e) => {
            setSelectedEmployee(e.value)
          }}
        />
        <label htmlFor=''>Empleado</label>
      </div>
      <Button
        loading={isPending}
        label='Enviar'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
      />
      {isSuccess && <small className='text-sm text-green-600'>Listo!</small>}
      {isPending && (
        <small className='text-sm text-yellow-600'>Creando...</small>
      )}
      {isError && <small className='text-sm text-red-600'>Error!</small>}
    </form>
  )
}
