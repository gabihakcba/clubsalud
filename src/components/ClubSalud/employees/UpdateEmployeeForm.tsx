'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type ReactElement, useEffect } from 'react'
import { type Employee, JobPosition, ContractType } from 'utils/ClubSalud/types'
import { useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { updateEmployee } from 'queries/ClubSalud/employees'
import { DateUtils } from 'utils/ClubSalud/dates'

interface param {
  employee: Employee
}
export default function UpdateEmployeeForm({ employee }: param): ReactElement {
  const [selectedJobPosition, setSelectedJobPosition] = useState<any>(null)
  const [selectedContractType, setSelectedContractType] = useState<any>(null)

  const query = useQueryClient()

  useEffect(() => {
    setSelectedJobPosition(employee.position)
    setSelectedContractType(employee.contractType)
    setValue('position', employee.position)
    setValue('contractType', employee.contractType)
  }, [])

  const {
    mutate: mutateU,
    isError: isErrorU,
    isSuccess: isSuccessU,
    isPending: isPendingU
  } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async (data) => {
      await query.refetchQueries({ queryKey: ['employees'] })
      reset()
    },
    onError: (error) => {
      console.error('Error updating employee:', error)
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
      action=''
      id={`employee${employee.id}`}
      onSubmit={handleSubmit((data) => {
        const parsed: Employee = {
          id: Number(employee.id),
          name: String(data.name),
          lastName: String(data.lastName),
          dni: BigInt(data.dni as number),
          phoneNumber: BigInt(data.phoneNumber as number),
          position: JobPosition[data.position],
          contractType: ContractType[data.contractType],
          alias: data.alias !== '' ? data.alias : undefined,
          email: String(data.email),
          cbu: data.cbu,
          salary: parseFloat(data.salary as string)
        }

        if (Number(data.salary) !== Number(employee.salary)) {
          parsed.lastSalaryUpdate = DateUtils.getCurrentDate()
        }
        mutateU(parsed)
      })}
      className='flex flex-column gap-4 pt-4'
    >
      <li className='p-float-label'>
        <InputText
          value={String(employee.id)}
          disabled
        />
        <label>ID</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='text'
          id='name'
          form={`employee${employee?.id}`}
          defaultValue={employee?.name}
          {...register('name', {
            required: {
              value: true,
              message: 'El nombre requerido'
            }
          })}
          invalid={errors?.name !== undefined}
        />
        <label>Nombre</label>
      </li>

      <li className='p-float-label'>
        <InputText
          type='text'
          id='lastName'
          form={`employee${employee?.id}`}
          defaultValue={employee?.lastName}
          {...register('lastName', {
            required: {
              value: true,
              message: 'Apellido es requerido'
            }
          })}
          invalid={errors?.lastName !== undefined}
        />
        <label>Apellido</label>
      </li>

      <li className='p-float-label'>
        <InputText
          type='number'
          id='dni'
          form={`employee${employee?.id}`}
          defaultValue={employee?.dni.toString()}
          {...register('dni', {
            required: {
              value: true,
              message: 'DNI es requerido'
            }
          })}
          invalid={errors?.dni !== undefined}
        />
        <label>DNI</label>
      </li>

      <li className='p-float-label'>
        <InputText
          type='number'
          id='cuit'
          form={`employee${employee?.id}`}
          defaultValue={employee?.cuit?.toString()}
          {...register('cuit')}
        />
        <label>CUIT</label>
      </li>

      <li className='p-float-label'>
        <InputText
          type='number'
          id='phoneNumber'
          form={`employee${employee?.id}`}
          defaultValue={employee?.phoneNumber.toString()}
          required
          {...register('phoneNumber', {
            required: {
              value: true,
              message: 'Número de teléfono es requerido'
            }
          })}
          invalid={errors?.phoneNumber !== undefined}
        />
        <label>Número de teléfono</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='email'
          id='email'
          form={`employee${employee?.id}`}
          defaultValue={employee?.email}
          required
          {...register('email', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.email !== undefined}
        />
        <label>Email</label>
      </li>

      <li className='p-float-label'>
        <Dropdown
          options={Object.keys(JobPosition).map((key) => ({
            label: key,
            value: key
          }))}
          optionLabel='label'
          optionValue='value'
          value={selectedJobPosition}
          {...register('position', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          onChange={(e) => {
            setSelectedJobPosition(e.value)
          }}
          className='w-full'
          invalid={errors?.position !== undefined}
        />
        <label>Posición</label>
      </li>

      <li className='p-float-label'>
        <Dropdown
          options={Object.keys(ContractType).map((key) => ({
            label: key,
            value: key.toLocaleLowerCase()
          }))}
          optionLabel='label'
          optionValue='label'
          value={selectedContractType}
          {...register('contractType', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          className='w-full'
          onChange={(e) => {
            setSelectedContractType(e.value)
          }}
          invalid={errors?.contractType !== undefined}
        />

        <label>Tipo de contrato</label>
      </li>

      <li className='p-float-label'>
        <InputText
          type='number'
          id='salary'
          form={`employee${employee?.id}`}
          defaultValue={employee?.salary}
          required
          {...register('salary', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.salary !== undefined}
        />
        <label>Salario</label>
      </li>

      <li className='p-float-label'>
        <InputText
          id='cbu'
          form={`employee${employee?.id}`}
          defaultValue={employee?.cbu ?? ''}
          {...register('cbu')}
        />
        <label>CBU</label>
      </li>

      <li className='p-float-label'>
        <InputText
          type='text'
          id='alias'
          form={`employee${employee?.id}`}
          defaultValue={employee?.alias !== '' ? employee.alias : undefined}
          {...register('alias')}
        />
        <label>Alias</label>
      </li>

      <li className='p-float-label'>
        <Calendar
          value={
            employee.lastSalaryUpdate
              ? DateUtils.newDate(employee.lastSalaryUpdate)
              : undefined
          }
          disabled
          dateFormat='dd/mm/yy'
        />
        <label>Ultima actualización</label>
      </li>
      <Button
        form={`employee${employee?.id}`}
        type='submit'
        label='Actualizar'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPendingU}
      />
      {isSuccessU && <p className='w-max text-green-400'>OK</p>}
      {isPendingU && <p className='w-max text-yellow-400'>Modificando...</p>}
      {isErrorU && <p className='w-max text-red-400'>Failed!</p>}
    </form>
  )
}
