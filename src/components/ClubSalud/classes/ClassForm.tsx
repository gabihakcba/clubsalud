import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreateClass_, type Class_ } from 'utils/ClubSalud/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editClass } from 'queries/ClubSalud/classes'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showToast } from '../toastService'

export default function ClassCard({
  class_
}: {
  class_: Class_ | undefined
}): ReactElement {
  const query = useQueryClient()

  const { mutate: edit, isPending } = useMutation({
    mutationFn: editClass,
    async onSuccess(data) {
      showToast('success', 'Hecho', `Clase ${data.name} editada correctamente`)
      await query.refetchQueries({ queryKey: ['classes'] })
      reset()
    },
    onError: () => {
      showToast('error', 'Error', 'Error al editar clase')
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
    // watch
  } = useForm()

  return (
    <form
      action=''
      id={`classes${class_?.id}`}
      className='flex flex-column justify-content-start align-items-end gap-4 pt-4'
      onSubmit={handleSubmit((data) => {
        if (class_) {
          edit({ id: class_.id, ...(data as CreateClass_) })
        }
      })}
    >
      <li className='p-float-label'>
        <InputText
          type='text'
          id='name'
          form={`class${class_?.id}`}
          defaultValue={class_?.name}
          {...register('name', {
            required: {
              value: true,
              message: 'El nombre requerido'
            }
          })}
          invalid={errors?.name !== undefined}
        />
        <label htmlFor='name'>Nombre</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='number'
          id='duration'
          form={`class${class_?.id}`}
          defaultValue={class_?.duration}
          {...register('duration', {
            required: {
              value: true,
              message: 'La duración es requerida'
            }
          })}
          invalid={errors?.duration !== undefined}
        />
        <label htmlFor='duration'>Duración (hs)</label>
      </li>

      <Button
        label='Enviar'
        type='submit'
        icon='pi pi-upload'
        iconPos='right'
        className='w-full'
        severity={isPending ? 'warning' : 'info'}
        loading={isPending}
      />
    </form>
  )
}
