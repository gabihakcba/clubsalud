'use client'

import { useRouter } from 'next/navigation'
import { type ReactElement, useEffect, useState } from 'react'
import { signInAccount } from 'queries/ClubSalud/login'
import { type Setter, type LogIn } from 'utils/ClubSalud/types'
import { type FieldValues, useForm } from 'react-hook-form'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import Image from 'next/image'
import logo from '../../../../public/logos/logo_large.png'
import { getUserToken, verifyToken } from 'utils/ClubSalud/auth'
import { parse } from 'cookie'

interface params {
  data: FieldValues
  router: AppRouterInstance
  setLoading: Setter
}

const logIn = async ({ data, router, setLoading }: params): Promise<void> => {
  const user: LogIn = data as LogIn
  setLoading('loading')
  try {
    await signInAccount(user)
    const token = getUserToken()
    const userLoged = await verifyToken(token)
    if (userLoged) {
      localStorage.setItem('user', JSON.stringify(userLoged))
      setLoading('success')
      router.push('clubsalud/admin')
    }
  } catch (error) {
    setLoading('error')
  }
}

export default function ClubSaludLogin(): ReactElement {
  const router: AppRouterInstance = useRouter()
  const [loading, setLoading] = useState('false')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const cookies: Record<string, string | undefined> = parse(
      document.cookie || ''
    )
    if (cookies.auth) {
      router.push('/clubsalud/admin')
    }
  }, [router])

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
          height={150}
          alt='Club Salud'
          className='m-6 p-2 border-round-lg'
        />
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
