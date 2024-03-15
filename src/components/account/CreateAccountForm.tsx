'use client'

import { type ReactElement } from 'react'
import { Permissions, type Setter } from 'utils/types'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import close from '../.././../public/close.svg'

export function CreateAccountForm({
  data,
  setIsOpen,
  setAccounts,
  setPages,
  sendForm
}: any): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit((dataForm) => {
        if (data?.id) {
          void sendForm(data.id, dataForm, setIsOpen, setAccounts as Setter)
        } else {
          void sendForm(
            dataForm,
            setIsOpen,
            setAccounts as Setter,
            setPages as Setter
          )
        }
      })}
      className='bg-white relative shadow-md rounded px-8 pt-6 pb-8 mb-4 h-max w-max flex flex-col gap-0 border-2 border-red-500'
      id='createForm'
    >
      {setIsOpen && (
        <button
          className='z-10 absolute right-2 top-2'
          onClick={() => setIsOpen((prev: boolean) => !prev)}
        >
          <Image
            src={close}
            alt='Imagen'
            width={25}
            height={25}
          />
        </button>
      )}
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
          id='username'
          form='createForm'
          type='text'
          autoComplete='off'
          defaultValue={data?.username}
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
          id='password'
          form='createForm'
          type='password'
          defaultValue={data?.password}
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
          id='repeatpassword'
          form='createForm'
          type='password'
          defaultValue={data?.password}
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
          htmlFor='permisos'
        >
          Permisos
        </label>
        <select
          {...register('permissions', {
            required: {
              value: true,
              message: 'Los permisos son requeridos'
            },
            validate: (value) => {
              return (
                value !== 'OTHER' || 'Debe seleccionar los permisos adecuados'
              )
            }
          })}
          name='permissions'
          id='permissions'
          form='createForm'
          defaultValue={Permissions[data?.permissions]}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value={Permissions.OWN}>Propietario</option>
          <option value={Permissions.ADM}>Administrador</option>
          <option value={Permissions.INS}>Instructor</option>
          <option value={Permissions.MEM}>Alumno</option>
          <option value={Permissions.OTHER}>Otro</option>
        </select>
        {errors?.permissions && (
          <span className='inputError'>
            {errors.permissions.message as string}
          </span>
        )}
      </div>
      <div className='flex flex-col'>
        <button
          form='createForm'
          className='mb-2 md:mb-auto py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          {data?.id ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
