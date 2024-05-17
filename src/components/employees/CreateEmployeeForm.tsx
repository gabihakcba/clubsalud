'use client'

import { ContractType } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { findAccountByUsername, getAccounts } from 'queries/accounts'
import { createEmployee } from 'queries/employees'
import { useEffect, type ReactElement, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { JobPosition, type CreateEmployee, type Employee } from 'utils/types'

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

export default function CreateEmployeeForm(): ReactElement {
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [selectedJobPosition, setSelectedJobPosition] = useState<any>(null)
  const [selectedContractType, setSelectedContractType] = useState<any>(null)

  const query = useQueryClient()

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createEmployee,
    onSuccess: (data) => {
      query.setQueryData(['employees'], (oldData: Employee[]) => [
        ...oldData,
        data
      ])
      reset()
    }
  })

  const { data: accounts, isPending: isPendingAccounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      return await getAccounts(0, 0)
    }
  })

  useEffect(() => {
    void query.refetchQueries({ queryKey: ['acc'] })
  }, [])

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
        console.log(data)
        const newEmployee = await parseData(data)
        console.log(newEmployee)
        if (newEmployee) {
          create(newEmployee)
        }
      })}
      className='flex flex-column gap-4 pt-4'
    >
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
        />
        <label>DNI</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('cuit')}
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
        />
        <label>Salario</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='number'
          {...register('cbu')}
        />
        <label>CBU:</label>
      </div>

      <div className='p-float-label'>
        <InputText
          type='text'
          {...register('alias')}
        />
        <label>Alias</label>
      </div>

      <div className='p-float-label'>
        <Dropdown
          options={accounts?.pages}
          loading={isPendingAccounts}
          optionLabel='username'
          optionValue='id'
          value={selectedAccount}
          className='w-full'
          {...register('accountName', {
            required: { value: true, message: 'Campo requerido' }
          })}
          onChange={(e) => {
            setSelectedAccount(e.value)
          }}
          invalid={errors?.accountName !== undefined}
          filter
        />
        <label>Cuenta asociada</label>
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
        loading={isPending}
      />
      {isPending && (
        <small className='text-sm text-yellow-500'>Creando...</small>
      )}
      {isSuccess && <small className='text-sm text-green-500'>Listo!</small>}
      {isError && <small className='text-sm text-red-500'>Error!</small>}
    </form>
  )
}
