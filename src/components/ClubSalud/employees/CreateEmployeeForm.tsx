'use client'

import { ContractType } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { createAccount, deleteAccount } from 'queries/ClubSalud/accounts'
import { createEmployee } from 'queries/ClubSalud/employees'
import { useEffect, type ReactElement, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import {
  JobPosition,
  type CreateEmployee,
  type Employee,
  Permissions,
  type CreateAccount
} from 'utils/ClubSalud/types'

const parseData = ({
  data,
  id
}: {
  data: FieldValues
  id: number
}): CreateEmployee => {
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
    cbu: data.cbu,
    alias: data.alias !== '' ? String(data.alias) : undefined,
    accountId: id
  }
}

export default function CreateEmployeeForm(): ReactElement {
  const [selectedJobPosition, setSelectedJobPosition] = useState<any>(null)
  const [selectedContractType, setSelectedContractType] = useState<any>(null)

  const query = useQueryClient()

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return await createEmployee(data as CreateEmployee)
    },
    onSuccess: (data) => {
      query.setQueryData(['employees'], (oldData: Employee[]) => [
        ...oldData,
        data
      ])
    },
    onError: async () => {
      if (newAccount) {
        await deleteAccount(newAccount.id)
      }
    }
  })

  const {
    mutate: mutateCreateAccoount,
    isError: isErrorCreateAccount,
    isPending: isPendingAccount,
    data: newAccount
  } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const res = await createAccount(data as CreateAccount)
      return res
    },
    onSuccess: async (data) => {
      const dataForm = getValues()
      const newAccountParsed = parseData({ data: dataForm, id: data.id })
      create(newAccountParsed)
    }
  })

  useEffect(() => {
    void query.refetchQueries({ queryKey: ['acc'] })
    setValue('permissions', [Permissions.ADM])
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(async (data, event) => {
        event?.preventDefault()
        mutateCreateAccoount({
          username: data.username,
          password: data.password,
          repeatpassword: data.repeatpassword,
          permissions: [Permissions[data.permissions]]
        })
      })}
      className='flex flex-column gap-4 pt-4'
    >
      {/**
       * Account
       */}

      <div className='p-float-label'>
        <InputText
          id='username'
          type='text'
          {...register('username', {
            required: {
              value: true,
              message: 'El nombre de usuario es requerido'
            }
          })}
          autoComplete='off'
          form='createForm'
          invalid={errors?.username !== undefined}
          className='w-full'
        />
        <label htmlFor='username'>Nombre de usuario</label>
      </div>

      <div className='p-float-label'>
        <Password
          id='password'
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            }
          })}
          onChange={(e) => {
            setValue('password', e.target.value)
          }}
          autoComplete='off'
          form='createForm'
          invalid={errors?.password !== undefined}
          className='w-full'
          toggleMask
          feedback={false}
        />
        <label htmlFor='password'>Contraseña</label>
      </div>

      <div className='p-float-label'>
        <Password
          id='repeatpassword'
          {...register('repeatpassword', {
            required: {
              value: true,
              message: 'Confirmar la contraseña es requerido'
            },
            validate: (value) => {
              return (
                watch('password') === value || 'Las contraseñas deben coincidir'
              )
            }
          })}
          onChange={(e) => {
            setValue('repeatpassword', e.target.value)
          }}
          autoComplete='off'
          form='createForm'
          invalid={errors?.repeatpassword !== undefined}
          className='w-full'
          toggleMask
          feedback={false}
        />
        <label htmlFor='repeatpassword'>Repetir Contraseña</label>
      </div>

      <div className='p-float-label'>
        <InputText
          {...register('permissions')}
          disabled
          value={Permissions.ADM}
          className='w-full'
        />
        <label htmlFor='permissions'>Permisos</label>
      </div>

      {/**
       *
       */}
      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('name', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.name !== undefined}
          className='w-full'
        />
        <label htmlFor='name'>Nombre</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('lastName', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.lastName !== undefined}
          className='w-full'
        />
        <label htmlFor='lastName'>Apellido</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('dni', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.dni !== undefined}
          className='w-full'
        />
        <label>DNI</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('cuit')}
          className='w-full'
        />
        <label>CUIT</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('phoneNumber', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.phoneNumber !== undefined}
          className='w-full'
        />
        <label>Teléfono</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='email'
          {...register('email', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.email !== undefined}
          className='w-full'
        />
        <label>E-mail</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('salary', {
            required: {
              value: true,
              message: 'Campo requerido'
            }
          })}
          invalid={errors?.salary !== undefined}
          className='w-full'
        />
        <label>Salario</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('cbu')}
          className='w-full'
        />
        <label>CBU:</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('alias')}
          className='w-full'
        />
        <label>Alias</label>
      </div>

      <div className='p-float-label'>
        <Dropdown
          options={Object.keys(JobPosition).map((key) => ({
            label: key,
            value: key.toLocaleLowerCase()
          }))}
          optionLabel='label'
          optionValue='label'
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
      </div>

      <div className='p-float-label'>
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
      </div>

      <Button
        type='submit'
        label='Crear'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
        loading={isPending || isPendingAccount}
        className='w-full'
      />
      {isPending && (
        <small className='text-sm text-yellow-500'>Creando...</small>
      )}
      {isSuccess && <small className='text-sm text-green-500'>Listo!</small>}
      {isError && <small className='text-sm text-red-500'>Error!</small>}
      {isErrorCreateAccount && (
        <small className='text-sm text-red-500'>Error creating account!</small>
      )}
    </form>
  )
}
