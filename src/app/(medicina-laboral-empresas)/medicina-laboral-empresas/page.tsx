'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { logInLaboral } from 'queries/Medintt/users'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { getDataSession, setDataSession } from 'utils/Medintt/session'
import { useRouter } from 'next/navigation'

export default function Page(): ReactElement {
  const { register, handleSubmit, setValue } = useForm()
  const [errorSession, setErrorSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const dataSession = getDataSession()
    if (dataSession.user) {
      router.push('/medicina-laboral-empresas/admin')
    }
  }, [router])

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { UsuarioWeb: string; PasswordWeb: string }) => {
      const response = await logInLaboral(data)
      if (response.ok) {
        setErrorSession(false)
        setDataSession(response.data.token, response.data.user)
        router.push('/medicina-laboral-empresas/admin')
      } else {
        setErrorSession(true)
      }
      return response
    }
  })

  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <h1 className='text-4xl'>Medicina Laboral Empresas</h1>
      <p className='text-2xl'>Iniciar Sesión</p>
      {errorSession && <p className='text-red-500 py-4 text-xl'>Usuario y/o contraseña incorrectos</p>}
      <form
        action=''
        className='flex flex-column align-items-start justify-content-center m-2 gap-4'
        onSubmit={handleSubmit(async (data, event) => {
          event?.preventDefault()
          const logInData = { UsuarioWeb: data.UsuarioWeb, PasswordWeb: data.PasswordWeb }
          mutate(logInData)
        })}
      >
        <FloatLabel>
          <InputText
            type='email'
            className='w-full'
            required
            {...register('UsuarioWeb')}
            onChange={(e) => {
              setValue('UsuarioWeb', e.currentTarget.value)
            }}
          />
          <label htmlFor=''>Usuario</label>
        </FloatLabel>
        <FloatLabel>
          <Password
            toggleMask
            required
            {...register('PasswordWeb')}
            onChange={(e) => {
              setValue('PasswordWeb', e.currentTarget.value)
            }}
            feedback={false}
          />
          <label htmlFor=''>Contraseña</label>
        </FloatLabel>
        <Button
          label='Iniciar'
          type='submit'
          className='w-full'
          icon='pi pi-sign-in'
          loading={isPending}
          iconPos='right'
          disabled={isPending}
        />
      </form>
    </div>
  )
}
