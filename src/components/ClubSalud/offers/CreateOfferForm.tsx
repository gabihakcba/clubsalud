import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { createPlan } from 'queries/ClubSalud/plan'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Plan } from 'utils/ClubSalud/types'
import { showToast } from '../toastService'

export function CreateOfferForm(): ReactElement {
  const { register, handleSubmit, setValue } = useForm()
  const [durationMonth, setDurationMonth] = useState<number>(0)
  const [discountPercent, setDiscountPercent] = useState<number>(0)

  const query = useQueryClient()

  const { mutate: create, isPending } = useMutation({
    mutationFn: async (plan: Plan) => {
      return await createPlan(plan)
    },
    onSuccess: async (data: Plan) => {
      showToast('success', 'Hecho', `Oferta ${data.title} creada correctamente`)
      await query.refetchQueries({ queryKey: ['offers'] })
    },
    onError: () => {
      showToast('error', 'Error', 'Error al crear la oferta')
    }
  })

  useEffect(() => {
    setValue('durationMonth', 0)
    setValue('discountPercent', 0)
  }, [])

  return (
    <form
      action=''
      onSubmit={handleSubmit((data) => {
        create(data as Plan)
      })}
      className='flex flex-column justify-content-start align-items-end gap-4 pt-4'
    >
      <FloatLabel>
        <InputText {...register('title', { required: true })} />
        <label htmlFor=''>Titulo</label>
      </FloatLabel>

      <FloatLabel>
        <InputText {...register('description', { required: true })} />
        <label htmlFor=''>Descripción</label>
      </FloatLabel>

      <FloatLabel>
        <InputNumber
          value={durationMonth}
          {...register('durationMonth', { required: true, min: 1, max: 12 })}
          min={0}
          max={99999}
          onChange={(e) => {
            setValue('durationMonth', e.value)
            setDurationMonth(Number(e.value))
          }}
        />
        <label htmlFor=''>Duración en meses</label>
      </FloatLabel>

      <FloatLabel>
        <InputNumber
          value={discountPercent}
          {...register('discountPercent', { required: true, min: 0, max: 100 })}
          min={0}
          max={99999}
          minFractionDigits={0}
          maxFractionDigits={3}
          onChange={(e) => {
            setValue('discountPercent', e.value)
            setDiscountPercent(Number(e.value))
          }}
        />
        <label htmlFor=''>Descuento total</label>
      </FloatLabel>
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
  )
}
