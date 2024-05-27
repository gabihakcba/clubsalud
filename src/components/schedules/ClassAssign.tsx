import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { getClasses } from 'queries/classes'
import { assignClass } from 'queries/schedules'
import { type ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Schedule } from 'utils/types'

interface params {
  schedule: Schedule
}
export default function ClassAssign({ schedule }: params): ReactElement {
  const [selectedClass, setSelectedClass] = useState<any>(null)

  const query = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  const { mutate: mutateClass_, isPending: isPendingAssign } = useMutation({
    mutationFn: assignClass,
    async onSuccess(data) {
      await query.invalidateQueries({ queryKey: ['sch'] })
      await query.refetchQueries({ queryKey: ['sch'] })
      reset()
    }
  })

  const { data: classes, isPending: isPendingClasses } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      return await getClasses()
    }
  })

  return (
    <form
      action=''
      id='assignClass'
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit((data) => {
        mutateClass_({
          className: data.classId,
          scheduleId: schedule.id
        })
      })}
    >
      <FloatLabel>
        <Dropdown
          options={classes}
          loading={isPendingClasses}
          optionLabel='name'
          optionValue='id'
          value={selectedClass}
          form='assign'
          className='w-full'
          filter
          {...register('class', {
            required: {
              value: true,
              message: 'El nombre de la clase es requerido'
            }
          })}
          onChange={(e) => {
            setSelectedClass(e.value)
            setValue('classId', e.value)
          }}
          invalid={errors?.class !== undefined}
        />
        <label>Clase</label>
      </FloatLabel>
      <Button
        type='submit'
        label='Enviar'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPendingAssign}
      />
    </form>
  )
}
