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

interface params {
  data: FieldValues
  router: AppRouterInstance
  setLoading: Setter
}
const logIn = async ({ data, router, setLoading }: params): Promise<void> => {
  const user: LogIn = data as LogIn
  setLoading('loading')
  try {
    const userLoged = await signInAccount(user)
    console.log(userLoged)
    setLoading('success')
    router.push('/admin/accounts')
  } catch (error) {
    setLoading('error')
  }
}

export default function Home(): ReactElement {
  const router = useRouter()
  const [loading, setLoading] = useState('false')

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
          void logIn({ data, router, setLoading })
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
              icon='pi pi-sign-in'
              size='small'
              loading={loading === 'loading'}
            ></Button>
            <Button
              label='Olvidé mi contraseña'
              size='small'
              link
              className='px-2'
            ></Button>
          </div>
          {loading === 'error' && (
            <span className='text-red-500'>
              Contraseña y/o usuario incorrecto
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
