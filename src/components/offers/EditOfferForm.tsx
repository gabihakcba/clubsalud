import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { updatePlan } from 'queries/plan'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type CreatePlan, type Plan } from 'utils/types'

export function EditOfferForm({ offer }: { offer: Plan | null }): ReactElement {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [currentOffer, setCurrentOffer] = useState<any>(null)

  const query = useQueryClient()

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (plan: Plan) => {
      return await updatePlan(plan)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['offers'] })
    }
  })

  useEffect(() => {
    setCurrentOffer(offer)
    setValue('title', offer?.title)
    setValue('description', offer?.description)
    setValue('durationMonth', offer?.durationMonth)
    setValue('discountPercent', offer?.discountPercent)
  }, [offer])

  return (
    <form
      action=''
      onSubmit={handleSubmit((data) => {
        update({ ...(data as CreatePlan), id: currentOffer.id })
      })}
      className='flex flex-column justify-content-start align-items-end gap-4 pt-4'
    >
      <FloatLabel>
        <InputText
          defaultValue={currentOffer?.title}
          {...register('title', { required: true })}
          invalid={errors?.title !== undefined}
        />
        <label htmlFor=''>Titulo</label>
      </FloatLabel>

      <FloatLabel>
        <InputText
          defaultValue={currentOffer?.description}
          {...register('description', { required: true })}
          invalid={errors?.description !== undefined}
        />
        <label htmlFor=''>Descripción</label>
      </FloatLabel>

      <FloatLabel>
        <InputNumber
          value={currentOffer?.durationMonth}
          {...register('durationMonth', { required: true, min: 1, max: 12 })}
          min={0}
          max={99999}
          onChange={(e) => {
            setValue('durationMonth', e.value)
            setCurrentOffer({
              ...currentOffer,
              durationMonth: Number(e.value)
            })
          }}
          invalid={errors?.durationMonth !== undefined}
        />
        <label htmlFor=''>Duración en meses</label>
      </FloatLabel>

      <FloatLabel>
        <InputNumber
          value={currentOffer?.discountPercent}
          {...register('discountPercent', { required: true, min: 0, max: 60 })}
          min={0}
          max={99999}
          onChange={(e) => {
            setValue('discountPercent', e.value)
            setCurrentOffer({
              ...currentOffer,
              discountPercent: Number(e.value)
            })
          }}
          invalid={errors?.discountPercent !== undefined}
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
