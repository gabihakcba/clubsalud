'use client'

import { type CreateAccount, Permissions, type Account } from 'utils/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { createAccount, updateAccount } from 'queries/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import { Button } from 'primereact/button'

interface params {
  account?: Account
}
export function CreateAccountForm({ account }: params): ReactElement {
  const permissions = [
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
    reset
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
      reset({
        username: '',
        password: '',
        repeatpassword: '',
        permissions: [Permissions.OTHER]
      })
      await query.refetchQueries({ queryKey: ['acc'] })
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
    }
  })

  return (
    <form
      onSubmit={handleSubmit((dataForm: FieldValues, event) => {
        event?.preventDefault()
        if (account?.id) {
          update({
            data: {
              ...dataForm,
              permissions: dataForm.permissions.map((p) => p.type)
            },
            id: account?.id ?? 0
          })
        } else {
          create({
            ...dataForm,
            permissions: dataForm.permissions.map((p) => p.type)
          })
        }
      })}
      className='relative rounded h-max w-max flex flex-column gap-4 pt-4'
      id={`createForm${account?.id}`}
    >
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
        ></InputText>
        <label htmlFor='username'>Nombre de usuario</label>
      </div>

      <div className='p-float-label'>
        <InputText
          id='password'
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            }
          })}
          autoComplete='off'
          form='createForm'
          invalid={errors?.password !== undefined}
        ></InputText>
        <label htmlFor='password'>Contraseña</label>
      </div>

      <div className='p-float-label'>
        <InputText
          id='repeatpassword'
          type='password'
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
        ></InputText>
        <label htmlFor='password'>Repetir Contraseña</label>
      </div>

      <div className=''>
        <MultiSelect
          value={watch('permissions')}
          options={permissions}
          optionLabel='permission'
          placeholder='Seleccionar Permisos'
          {...register('permissions', {
            required: {
              value: true,
              message: 'Al menos un permiso requerido'
            }
          })}
          invalid={errors?.permissions !== undefined}
        />
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
