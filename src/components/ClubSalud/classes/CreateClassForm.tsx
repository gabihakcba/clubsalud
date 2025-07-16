import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Class_, type CreateClass_ } from 'utils/ClubSalud/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClass } from 'queries/ClubSalud/classes'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showToast } from '../toastService'

export default function CreateClassForm(): ReactElement {
  const query = useQueryClient()

  const { mutate: create, isPending } = useMutation({
    mutationFn: createClass,
    async onSuccess(data: Class_) {
      showToast('success', 'Hecho', `Clase ${data.name} creada correctamente`)
      reset()
      await query.setQueryData(['classes'], (oldData: Class_[]) => [
        ...oldData,
        data
      ])
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  return (
    <div className='w-full h-full'>
      <form
        action=''
        id={'class'}
        className='flex flex-column justify-content-start align-items-end gap-4 pt-4'
        onSubmit={handleSubmit((data) => {
          create(data as CreateClass_)
        })}
      >
        <li className='p-float-label'>
          <InputText
            type='text'
            id='name'
            form={'class'}
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre requerido'
              }
            })}
            invalid={errors?.name !== undefined}
          />
          <label>Nombre</label>
        </li>
        <li className='p-float-label'>
          <InputText
            type='number'
            id='duration'
            form={'class'}
            {...register('duration', {
              required: {
                value: true,
                message: 'La duración es requerida'
              }
            })}
            invalid={errors?.duration !== undefined}
          />
          <label>Duración (hs)</label>
        </li>
        <Button
          type='submit'
          label='Enviar'
          size='small'
          className='w-full'
          icon='pi pi-upload'
          iconPos='right'
          loading={isPending}
        />
      </form>
    </div>
  )
}
