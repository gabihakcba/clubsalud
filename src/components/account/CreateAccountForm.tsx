'use client'

import { type CreateAccount, Permissions, type Account } from 'utils/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { createAccount, updateAccount } from 'queries/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type ReactElement, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { Password } from 'primereact/password'

interface params {
  account?: Account
}
export function CreateAccountForm({ account }: params): ReactElement {
  const [permissionSelected, setPermissionSelected] = useState<any>([])

  useEffect(() => {
    if (account?.permissions) {
      setPermissionSelected(account.permissions)
      setValue('permissions', account.permissions)
    }
  }, [])

  const permissionsList = [
    {
      permission: 'Propietario',
      type: Permissions.OWN
    },
    {
      permission: 'Administrador',
      type: Permissions.ADM
    },
    {
      permission: 'Profesor',
      type: Permissions.INS
    },
    {
      permission: 'Alumno',
      type: Permissions.MEM
    }
  ]

  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm()

  const {
    mutate: create,
    isSuccess: isSuccessC,
    isPending: isPendingC,
    isError: isErrorC
  } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return await createAccount(data as CreateAccount)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['acc'] })
      reset({
        username: null,
        password: null,
        repeatPassword: null,
        permissions: null
      })
    }
  })

  const {
    mutate: update,
    isSuccess: isSuccessU,
    isPending: isPendingU,
    isError: isErrorU
  } = useMutation({
    mutationFn: async ({ data, id }: { data: FieldValues; id: number }) => {
      await updateAccount({ id, ...(data as CreateAccount) })
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['account'] })
      reset({
        username: null,
        password: null,
        repeatPassword: null,
        permissions: null
      })
    }
  })

  return (
    <form
      onSubmit={handleSubmit((dataForm: FieldValues, event) => {
        event?.preventDefault()
        if (account?.id) {
          update({
            data: dataForm,
            id: account?.id
          })
        } else {
          create(dataForm)
        }
      })}
      className='relative rounded h-max w-max flex flex-column gap-4 pt-4'
      id={`createForm${account?.id}`}
    >
      <div className='p-float-label'>
        <InputText
          id='username'
          type='text'
          className='w-full'
          {...register('username', {
            required: {
              value: true,
              message: 'El nombre de usuario es requerido'
            }
          })}
          autoComplete='off'
          form='createForm'
          invalid={errors?.username !== undefined}
          defaultValue={account?.username}
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
          autoComplete='off'
          form='createForm'
          invalid={errors?.password !== undefined}
          defaultValue={account?.password}
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
          autoComplete='off'
          form='createForm'
          invalid={errors?.repeatpassword !== undefined}
          defaultValue={account?.password}
          className='w-full'
          toggleMask
          feedback={false}
        />
        <label htmlFor='repeatpassword'>Repetir Contraseña</label>
      </div>

      <div className='p-float-label'>
        <MultiSelect
          className='w-full'
          {...register('permissions', {
            required: true
          })}
          options={permissionsList}
          optionLabel='permission'
          optionValue='type'
          value={permissionSelected}
          display='chip'
          onChange={(e) => {
            setPermissionSelected(e.value)
            setValue('permissions', e.value)
          }}
          invalid={errors?.permissions !== undefined}
        />
        <label htmlFor='permissions'>Permisos</label>
      </div>

      <div className='flex flex-column'>
        <Button
          form={`createForm${account?.id}`}
          type='submit'
          label={account?.id ? 'Actualizar' : 'Crear'}
          icon='pi pi-upload'
          iconPos='right'
          loading={isPendingC || isPendingU}
        />
        <small className='w-full flex flex-row items-center justify-center'>
          {(isSuccessC || isSuccessU) && (
            <p className='w-max text-green-400'>Listo!</p>
          )}
          {(isErrorC || isErrorU) && (
            <p className='w-max text-red-400'>Error!</p>
          )}
        </small>
      </div>
    </form>
  )
}
