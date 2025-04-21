'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { logInLaboral } from 'queries/Medintt/users'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'

export default function Page(): ReactElement {
  const { register, handleSubmit, setValue } = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await logInLaboral(data)
      console.log(response)
      return response
    }
  })

  return (
    <div className='flex flex-column align-items-center justify-content-center'>
      <h1 className='text-4xl'>Medicina Laboral Empresas</h1>
      <p className='text-2xl'>Iniciar Sesión</p>
      <form
        action=''
        className='flex flex-column align-items-start justify-content-center m-2 gap-4'
        onSubmit={handleSubmit(async (data, event) => {
          event?.preventDefault()
          mutate({ username: data.username, password: data.password })
        })}
      >
        <FloatLabel>
          <InputText
            className='w-full'
            required
            {...register('username')}
            onChange={(e) => {
              setValue('username', e.currentTarget.value)
            }}
          />
          <label htmlFor=''>Usuario</label>
        </FloatLabel>
        <FloatLabel>
          <Password
            toggleMask
            required
            {...register('password')}
            onChange={(e) => {
              setValue('password', e.currentTarget.value)
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
