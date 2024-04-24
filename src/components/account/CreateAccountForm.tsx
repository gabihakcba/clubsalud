'use client'

import { type CreateAccount, Permissions, type Account } from 'utils/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { createAccount, updateAccount } from 'queries/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReactElement } from 'react'

interface params {
  account?: Account
}
export function CreateAccountForm({ account }: params): ReactElement {
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
      onSubmit={handleSubmit((dataForm: FieldValues, e) => {
        if (account?.id) {
          update({ data: dataForm, id: account?.id ?? 0 })
        } else {
          create(dataForm)
        }
      })}
      className='relative rounded px-8 pt-6 pb-8 mb-4 h-max w-max flex flex-column gap-0 border-2 border-red-500'
      id={`createForm${account?.id}`}
    >
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='username'
        >
          Nombre de Usuario
        </label>
        <input
          {...register('username', {
            required: {
              value: true,
              message: 'El nombre de usuario es requerido'
            }
          })}
          name='username'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id={`username${account?.id}`}
          form='createForm'
          type='text'
          autoComplete='off'
          defaultValue={account?.username}
          placeholder='Nombre de usuario'
        ></input>
        {errors?.username && (
          <span className='inputError'>
            {errors.username.message as string}
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='password'
        >
          Contraseña
        </label>
        <input
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            }
          })}
          name='password'
          id={`password${account?.id}`}
          form='createForm'
          type='password'
          defaultValue={account?.password}
          className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='******************'
        ></input>
        {errors?.password && (
          <span className='inputError'>
            {errors.password.message as string}
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='repeatpassword'
        >
          Repetir Contraseña
        </label>
        <input
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
          name='repeatpassword'
          id={`repeatpassword${account?.id}`}
          form='createForm'
          type='password'
          defaultValue={account?.password}
          className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='******************'
        ></input>
        {errors?.repeatpassword && (
          <span className='inputError'>
            {errors.repeatpassword.message as string}
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='permissions'
        >
          Permisos
        </label>
        <div className='flex flex-col sm:flex-row gap-2 items-center justify-center'>
          <div className='flex gap-2 border p-1'>
            <label htmlFor=''>Propietario</label>
            <input
              type='checkbox'
              value={Permissions.OWN}
              defaultChecked={account?.permissions.includes(Permissions.OWN)}
              {...register('permissions', {
                required: {
                  value: true,
                  message: 'Al menos un permiso requerido'
                }
              })}
            />
          </div>
          <div className='flex gap-2 border p-1'>
            <label htmlFor=''>Administrador</label>
            <input
              type='checkbox'
              value={Permissions.ADM}
              defaultChecked={account?.permissions.includes(Permissions.ADM)}
              {...register('permissions', {
                required: {
                  value: true,
                  message: 'Al menos un permiso requerido'
                }
              })}
            />
          </div>
          <div className='flex gap-2 border p-1'>
            <label htmlFor=''>Profesor</label>
            <input
              type='checkbox'
              value={Permissions.INS}
              defaultChecked={account?.permissions.includes(Permissions.INS)}
              {...register('permissions', {
                required: {
                  value: true,
                  message: 'Al menos un permiso requerido'
                }
              })}
            />
          </div>
          <div className='flex gap-2 border p-1'>
            <label htmlFor=''>Alumno</label>
            <input
              type='checkbox'
              value={Permissions.MEM}
              defaultChecked={account?.permissions.includes(Permissions.MEM)}
              {...register('permissions', {
                required: {
                  value: true,
                  message: 'Al menos un permiso requerido'
                }
              })}
            />
          </div>
        </div>
        {errors?.permissions && (
          <span className='inputError'>
            {errors.permissions.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col'>
        <button
          form={`createForm${account?.id}`}
          className='mb-2 md:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 font-bold rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          {account?.id ? 'Actualizar' : 'Crear'}
        </button>
        <span className='w-full flex flex-row items-center justify-center'>
          {(isPendingC || isPendingU) && (
            <p className='w-max text-yellow-400'>
              {account?.id ? 'Actualizando' : 'Creando'} usuario...
            </p>
          )}
          {(isSuccessC || isSuccessU) && (
            <p className='w-max text-green-400'>OK</p>
          )}
          {(isErrorC || isErrorU) && (
            <p className='w-max text-red-400'>Failed!</p>
          )}
        </span>
      </div>
    </form>
  )
}
