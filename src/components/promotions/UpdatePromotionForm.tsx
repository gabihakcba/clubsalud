import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Promotion, type CreatePromotion } from 'utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePromotion } from 'queries/promotions'

interface params {
  closeModal: () => void
  promotion: Promotion
}
export default function UpdatePromotionForm({
  closeModal,
  promotion
}: params): ReactElement {
  const query = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updatePromotion,
    async onSuccess(data: Promotion) {
      reset()
      closeModal()
      await query.setQueryData(['prom'], (oldData: Promotion[]) => {
        const index = oldData.findIndex((element: Promotion) => {
          return promotion.id === element.id
        })
        const newData = [...oldData]
        newData.splice(index, 1, data)
        return newData
      })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  return (
    <div className='w-full h-full bg-white rounded p-2'>
      <form
        action=''
        id={'promotion'}
        className='flex flex-col justify-start items-end'
        onSubmit={handleSubmit((data) => {
          mutate({ id: promotion.id, ...(data as CreatePromotion) })
        })}
      >
        <div className='flex flex-row'>
          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
          >
            <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
              <label className='block mb-2 text-lg font-medium text-gray-900'>
                Título
              </label>
              <div>
                <input
                  type='text'
                  id='title'
                  form={'promotion'}
                  className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  defaultValue={promotion.title}
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'El titulo requerido'
                    }
                  })}
                />
                {errors?.title && (
                  <span className='inputError'>
                    {errors.title.message as string}
                  </span>
                )}
              </div>
            </li>
            <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
              <label className='block mb-2 text-lg font-medium text-gray-900'>
                Descripción
              </label>
              <div>
                <input
                  type='text'
                  id='description'
                  form={'promotion'}
                  defaultValue={promotion.description}
                  className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'La descripción es requerida'
                    }
                  })}
                />
                {errors?.description && (
                  <span className='inputError'>
                    {errors.description.message as string}
                  </span>
                )}
              </div>
            </li>
            <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
              <label className='block mb-2 text-lg font-medium text-gray-900'>
                Cantidad de veces por semana
              </label>
              <div>
                <input
                  type='number'
                  id='amountWeeklyClasses'
                  form={'promotion'}
                  defaultValue={promotion.amountWeeklyClasses}
                  className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('amountWeeklyClasses', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}
                />
                {errors?.amountWeeklyClasses && (
                  <span className='inputError'>
                    {errors.amountWeeklyClasses.message as string}
                  </span>
                )}
              </div>
            </li>
            <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
              <label className='block mb-2 text-lg font-medium text-gray-900'>
                Precio
              </label>
              <div>
                <input
                  type='number'
                  id='amountPrice'
                  form={'promotion'}
                  defaultValue={promotion.amountPrice}
                  className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('amountPrice', {
                    required: {
                      value: true,
                      message: 'El campo es requerido'
                    }
                  })}
                />
                {errors?.amountPrice && (
                  <span className='inputError'>
                    {errors.amountPrice.message as string}
                  </span>
                )}
              </div>
            </li>
          </ul>
        </div>
        <button
          className='blueButtonForm p-1'
          type='submit'
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
