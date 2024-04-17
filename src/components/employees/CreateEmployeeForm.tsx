'use client'

import { ContractType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { findAccountByUsername } from 'queries/accounts'
import { createEmployee } from 'queries/employees'
import { type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { JobPosition, type CreateEmployee } from 'utils/types'

const parseData = async (data: FieldValues): Promise<CreateEmployee | null> => {
  try {
    const hasAccount: boolean = data.accountName !== ''
    let id: number | null = null
    if (hasAccount) {
      const account = await findAccountByUsername(data.accountName as string)
      id = account.id
    }
    return {
      name: String(data.name),
      lastName: String(data.lastName),
      dni: BigInt(Number(data.dni)),
      cuit: data.cuit !== '' ? BigInt(Number(data.cuit)) : undefined,
      phoneNumber: BigInt(Number(data.phoneNumber)),
      email: String(data.email),
      position: data.position,
      contractType: data.contractType,
      salary: Number(data.salary),
      cbu: data.cbu !== '' ? BigInt(Number(data.cbu)) : undefined,
      alias: data.alias !== '' ? String(data.alias) : undefined,
      accountId: hasAccount ? Number(id) : undefined
    }
  } catch (error) {
    return null
  }
}

interface params {
  closeModal: () => void
}
export default function CreateEmployeeForm({
  closeModal
}: params): ReactElement {
  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createEmployee,
    onSuccess: (data) => {
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
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        const newEmployee = await parseData(data)
        if (newEmployee) {
          create(newEmployee)
        }
      })}
      className='flex flex-col gap-2 bg-white rounded p-2'
    >
      <h3 className='text-xl font-bold'>Crear Empleado</h3>
      <hr className='m-1' />
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Nombre:</label>
          <input
            type='text'
            {...register('name', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='nombre'
          />
        </div>
        {errors?.name && (
          <span className='text-sm text-red-500'>
            {errors.name.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Apellido:</label>
          <input
            type='text'
            {...register('lastName', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='apellido'
          />
        </div>
        {errors?.lastName && (
          <span className='text-sm text-red-500'>
            {errors.lastName.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>DNI:</label>
          <input
            type='number'
            {...register('dni', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='dni'
          />
        </div>
        {errors?.dni && (
          <span className='text-sm text-red-500'>
            {errors.dni.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>CUIT:</label>
          <input
            type='number'
            {...register('cuit')}
            className='border px-2 rounded'
            placeholder='cuit'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Teléfono:</label>
          <input
            type='number'
            {...register('phoneNumber', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='número de teléfono/celular'
          />
        </div>
        {errors?.phoneNumber && (
          <span className='text-sm text-red-500'>
            {errors.phoneNumber.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>E-mail:</label>
          <input
            type='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='example@example.com'
          />
        </div>
        {errors?.email && (
          <span className='text-sm text-red-500'>
            {errors.email.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Salario:</label>
          <input
            type='number'
            {...register('salary', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='salario'
          />
        </div>
        {errors?.salary && (
          <span className='text-sm text-red-500'>
            {errors.salary.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>CBU:</label>
          <input
            type='number'
            {...register('cbu', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='cbu'
          />
        </div>
        {errors?.cbu && (
          <span className='text-sm text-red-500'>
            {errors.cbu.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>CBU:</label>
          <input
            type='text'
            {...register('alias', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
            placeholder='alias'
          />
        </div>
        {errors?.alias && (
          <span className='text-sm text-red-500'>
            {errors.alias.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Cuenta asociada:</label>
          <input
            type='text'
            {...register('accountName')}
            className='border px-2 rounded'
            placeholder='nombre de usuario'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Posición:</label>
          <select
            {...register('position', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
          >
            <option value=''>Select</option>
            <option value={JobPosition.CLEANING}>Limpieza</option>
            <option value={JobPosition.MAINTENANCE}>Mantenimiento</option>
            <option value={JobPosition.RECEPTIONIST}>Recepcionista</option>
            <option value={JobPosition.OTHER}>Otro</option>
          </select>
        </div>
        {errors?.position && (
          <span className='text-sm text-red-500'>
            {errors.position.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between items-center'>
          <label>Tipo de contrato:</label>
          <select
            {...register('contractType', {
              required: {
                value: true,
                message: 'Campo requerido'
              }
            })}
            className='border px-2 rounded'
          >
            <option value=''>Select</option>
            <option value={ContractType.PERMANENT}>Permanente</option>
            <option value={ContractType.CASUAL}>Casual</option>
            <option value={ContractType.OTHER}>Otro</option>
          </select>
        </div>
        {errors?.contractType && (
          <span className='text-sm text-red-500'>
            {errors.contractType.message as string}
          </span>
        )}
      </div>

      <div className='flex flex-col p-2 justify-center'>
        <button
          type='submit'
          className='blueButtonForm p-1'
        >
          Crear
        </button>
        {isPending && (
          <span className='text-sm text-yellow-500'>Creando...</span>
        )}
        {isSuccess && <span className='text-sm text-green-500'>Listo!</span>}
        {isError && <span className='text-sm text-red-500'>Error!</span>}
      </div>
    </form>
  )
}
