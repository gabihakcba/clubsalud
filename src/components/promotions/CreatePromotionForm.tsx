import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreatePromotion, type Promotion } from 'utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPromotion } from 'queries/promotions'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function CreatePromotionForm(): ReactElement {
  const query = useQueryClient()

  const { mutate: create, isPending } = useMutation({
    mutationFn: createPromotion,
    async onSuccess(data) {
      reset()
      await query.setQueryData(['promotions'], (oldData: Promotion[]) => [
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
    <form
      action=''
      id={'promotion'}
      className='flex flex-column justify-content-start pt-4 gap-4'
      onSubmit={handleSubmit((data) => {
        create(data as CreatePromotion)
      })}
    >
      <li className='p-float-label'>
        <InputText
          type='text'
          id='title'
          form={'promotion'}
          {...register('title', {
            required: {
              value: true,
              message: 'El titulo requerido'
            }
          })}
          invalid={errors?.title !== undefined}
        />
        <label className=''>Título</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='text'
          id='description'
          form={'promotion'}
          {...register('description', {
            required: {
              value: true,
              message: 'La descripción es requerida'
            }
          })}
          autoComplete='off'
          invalid={errors?.description !== undefined}
        />
        <label className=''>Descripción</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='number'
          id='amountWeeklyClasses'
          form={'promotion'}
          {...register('amountWeeklyClasses', {
            required: {
              value: true,
              message: 'El campo es requerido'
            }
          })}
          invalid={errors?.amountWeeklyClasses !== undefined}
        />
        <label className=''>Cantidad de veces por semana</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='number'
          id='amountPrice'
          form={'promotion'}
          {...register('amountPrice', {
            required: {
              value: true,
              message: 'El campo es requerido'
            }
          })}
          invalid={errors?.amountPrice !== undefined}
        />
        <label className=''>Precio</label>
      </li>
      <Button
        type='submit'
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPending}
      />
    </form>
  )
}
