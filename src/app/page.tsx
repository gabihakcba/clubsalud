'use client'

import { useRouter } from 'next/navigation'
import { type ReactElement, useState } from 'react'
import { signInAccount } from 'queries/login'
import { type Setter, type LogIn } from 'utils/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import Image from 'next/image'
import logo from '../../public/logos/logo_large.png'

const logIn = async (
  data: FieldValues,
  router: AppRouterInstance,
  setLogginFailed: Setter
): Promise<void> => {
  const user: LogIn = data as LogIn
  const response = await signInAccount(user)
  if (response.status === 200) {
    router.push('/admin')
  } else {
    setLogginFailed(true)
  }
}

export default function Home(): ReactElement {
  const router = useRouter()
  const [logginFailed, setLogginFailed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <div className='flex w-full h-screen justify-content-center align-items-center'>
      <form
        id='loginForm'
        className='flex flex-column gap-4 align-items-center'
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault()
          void logIn(data, router, setLogginFailed)
        })}
      >
        <Image
          src={logo}
          height={70}
          alt='Club Salud'
          className='m-2'
        ></Image>
        <div className='p-float-label'>
          <InputText
            id='username'
            invalid={errors?.username !== undefined}
            {...register('username', {
              required: {
                value: true,
                message: 'El nombre es requerido'
              }
            })}
          ></InputText>
          <label htmlFor='username'>Username</label>
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
            invalid={errors?.password !== undefined}
          ></InputText>
          <label htmlFor='password'>Password</label>
        </div>

        <div className='flex flex-column gap-2'>
          <div className=''>
            <Button
              label='Entrar'
              form='loginForm'
              type='submit'
            ></Button>
            <Button
              label='Olvidé mi contraseña'
              className='px-2'
              link
            ></Button>
          </div>
          {logginFailed && (
            <span className='text-red-500'>
              Contraseña y/o usuario incorrecto
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
