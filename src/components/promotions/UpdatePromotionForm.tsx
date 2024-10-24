import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Promotion, type CreatePromotion } from 'utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePromotion } from 'queries/promotions'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

interface params {
  promotion: Promotion
}
export default function UpdatePromotionForm({
  promotion
}: params): ReactElement {
  const query = useQueryClient()

  const {
    mutate: edit,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: updatePromotion,
    async onSuccess(data: Promotion) {
      reset()
      await query.refetchQueries({ queryKey: ['promotions'] })
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
      className='flex flex-column justify-content-start align-items-center pt-4 gap-4'
      onSubmit={handleSubmit((data) => {
        edit({ id: promotion.id, ...(data as CreatePromotion) })
      })}
    >
      <li className='p-float-label'>
        <InputText
          type='text'
          id='title'
          form={'promotion'}
          defaultValue={promotion.title}
          {...register('title', {
            required: {
              value: true,
              message: 'El titulo requerido'
            }
          })}
          invalid={errors?.title !== undefined}
        />
        <label>Título</label>
      </li>
      <li className='p-float-label'>
        <InputTextarea
          id='description'
          form={'promotion'}
          defaultValue={promotion.description}
          {...register('description', {
            required: {
              value: true,
              message: 'La descripción es requerida'
            }
          })}
          invalid={errors?.description !== undefined}
        />
        <label>Descripción</label>
      </li>
      <li className='p-float-label'>
        <InputText
          type='number'
          id='amountWeeklyClasses'
          form={'promotion'}
          defaultValue={promotion.amountWeeklyClasses}
          {...register('amountWeeklyClasses', {
            required: {
              value: true,
              message: 'El campo es requerido'
            }
          })}
          invalid={errors?.amountWeeklyClasses !== undefined}
        />
        <label>Cantidad de veces por semana</label>
      </li>
      <Button
        type='submit'
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        className='w-full'
        size='small'
        loading={isPending}
      />
      {isSuccess && <small className='text-green-500'>Listo!</small>}
      {isPending && <small className='text-yellow-500'>Editando...</small>}
      {isError && <small className='text-red-500'>Erroro!</small>}
    </form>
  )
}
