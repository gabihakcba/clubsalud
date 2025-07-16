import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { createAudit, getCash } from 'queries/ClubSalud/cash-register'
import { type ReactElement } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type CreateCashAudit } from 'utils/ClubSalud/types'

export default function AuditoriaForm(): ReactElement {
  const { data: cajaTeorica } = useQuery({
    queryKey: ['cajaTeorica'],
    queryFn: getCash
  })

  const { mutate: create, isPending } = useMutation({
    mutationFn: async (data: CreateCashAudit) => {
      return await createAudit(data)
    }
  })

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: FieldValues): void => {
    create(data as CreateCashAudit)
  }

  return (
    <form
      action=''
      className='flex flex-column gap-4 w-full justify-content-start'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        onSubmit(data)
      })}
    >
      {/* Retiro */}
      <div className='w-full flex flex-row gap-4 align-items-center justify-content-between'>
        <label htmlFor=''>Retiro</label>
        <div className='flex flex-column'>
          <InputNumber
            {...register('withdrawal', {
              required: { value: true, message: 'Campo requerido' }
            })}
            max={999999999}
            min={0}
            className={errors.withdrawal ? 'p-invalid' : ''}
            onChange={(e) => {
              setValue('withdrawal', e.value)
            }}
          />
          {errors.withdrawal && (
            <small className='p-error'>
              {errors.withdrawal.message as string}
            </small>
          )}
        </div>
      </div>

      {/* Caja */}
      <div className='w-full flex flex-row gap-4 align-items-center justify-content-between'>
        <label htmlFor=''>Caja (Libro)</label>
        <InputNumber
          value={cajaTeorica}
          disabled
          name='theoreticalCash'
        />
      </div>
      <div className='w-full flex flex-row gap-4 align-items-center justify-content-between'>
        <label htmlFor=''>Caja (Real)</label>
        <div className='flex flex-column'>
          <InputNumber
            {...register('realCash', {
              required: { value: true, message: 'Campo requerido' }
            })}
            max={999999999}
            min={0}
            className={errors.realCash ? 'p-invalid' : ''}
            onChange={(e) => {
              setValue('realCash', e.value)
            }}
          />
          {errors.realCash && (
            <small className='p-error'>
              {errors.realCash.message as string}
            </small>
          )}
        </div>
      </div>

      {/* Resto */}
      <div className='w-full flex flex-row gap-4 align-items-center justify-content-between'>
        <label htmlFor=''>Resto (Libro)</label>
        <InputNumber
          value={cajaTeorica ? cajaTeorica - watch('withdrawal') : 0}
          disabled
          name='theoreticalRemainder'
        />
      </div>
      <div className='w-full flex flex-row gap-4 align-items-center justify-content-between'>
        <label htmlFor=''>Resto (Real)</label>
        <div className='flex flex-column'>
          <InputNumber
            {...register('realRemainder', {
              required: { value: true, message: 'Campo requerido' }
            })}
            max={999999999}
            min={0}
            className={errors.realRemainder ? 'p-invalid' : ''}
            onChange={(e) => {
              setValue('realRemainder', e.value)
            }}
          />
          {errors.realRemainder && (
            <small className='p-error'>
              {errors.realRemainder.message as string}
            </small>
          )}
        </div>
      </div>

      {/* Comentario */}
      <div className='w-full flex flex-row gap-4 align-items-center justify-content-between'>
        <label htmlFor=''>Comentarios</label>
        <InputText
          {...register('comment')}
          onChange={(e) => {
            setValue('comment', e.target.value)
          }}
        />
      </div>

      <Button
        type='submit'
        size='small'
        label='Crear auditoria'
        outlined
        severity='success'
        icon='pi pi-plus'
        iconPos='right'
        loading={isPending}
      />
    </form>
  )
}
