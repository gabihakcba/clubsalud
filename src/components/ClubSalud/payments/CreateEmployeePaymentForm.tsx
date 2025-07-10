import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { createEmployeePayment } from 'queries/ClubSalud/employeePayments'
import { getEmployees } from 'queries/ClubSalud/employees'
import { useRef, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreateEmployeePayment } from 'utils/ClubSalud/types'
import { FloatLabel } from 'primereact/floatlabel'
import { Toast } from 'primereact/toast'
import { type AxiosError } from 'axios'

interface params {
  closeModal: () => void
}
export default function CreateEmployeePaymentForm({
  closeModal
}: params): ReactElement {
  const toast = useRef<Toast>(null)
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
    onSuccess: async (data) => {
      await query.refetchQueries({ queryKey: ['employeePayments'] })
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Pago hecho correctamente',
          life: 3000,
          sticky: true
        })
      }
      reset()
      setTimeout(closeModal, 250)
    },
    onError: (data: AxiosError) => {
      console.log('Error creating payment:', data)
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error al crear pago',
          life: 3000,
          sticky: true
        })
      }
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
      <Toast ref={toast} position='top-left'/>
      <FloatLabel>
        <Dropdown
          className='w-full'
          options={employees}
          optionLabel='name'
          optionValue='id'
          loading={loadingEmployees}
          filter
          filterBy='dni,name'
          value={selectedEmployee}
          onChange={(e) => {
            setSelectedEmployee(e.value)
          }}
        />
        <label htmlFor=''>Empleado</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          {...register('monthPayment', {
            required: { value: true, message: 'Campo requerido' }
          })}
          inputId='monthPayment'
          invalid={errors?.monthPayment !== undefined}
          view='month'
        />
        <label htmlFor='monthPayment'>Mes trabajado</label>
      </FloatLabel>

      <FloatLabel>
        <Calendar
          {...register('date', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.date !== undefined}
        />
        <label htmlFor='date'>Fecha de pago</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          type='number'
          className='border-2 rounded text-end'
          {...register('hoursWorked')}
        />
        <label htmlFor='hoursWorked'>Horas trabajadas</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          type='number'
          {...register('amount', {
            required: { value: true, message: 'Campo requerido' }
          })}
          invalid={errors?.amount !== undefined}
        />
        <label htmlFor='amount'>Cantidad</label>
      </FloatLabel>

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
