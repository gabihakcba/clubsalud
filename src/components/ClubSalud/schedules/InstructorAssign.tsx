import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { getInstructors } from 'queries/ClubSalud/instructors'
import { assignInstructor } from 'queries/ClubSalud/schedules'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Schedule } from 'utils/ClubSalud/types'

interface params {
  schedule: Schedule
}
export default function InstructorAssign({ schedule }: params): ReactElement {
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null)

  const query = useQueryClient()

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  const { mutate: mutateInstructor, isPending: isPendingInstructor } =
    useMutation({
      mutationFn: async (data: {
        instructorId: number
        scheduleId: number
      }) => {
        return await assignInstructor(data)
      },
      async onSuccess(data) {
        await query.refetchQueries({ queryKey: ['sch'] })
        reset()
      }
    })

  return (
    <form
      action=''
      id='assignInstructor'
      onSubmit={handleSubmit((data) => {
        mutateInstructor({
          instructorId: data.instructorId,
          scheduleId: schedule.id
        })
      })}
      className='flex flex-column pt-4 gap-4'
    >
      <FloatLabel>
        <Dropdown
          form='assign'
          options={instructors}
          optionLabel='name'
          optionValue='id'
          filter
          filterBy='dni,name'
          value={selectedInstructor}
          {...register('instructor', {
            required: {
              value: true,
              message: 'El nombre del profesor es requerido'
            }
          })}
          onChange={(e) => {
            setSelectedInstructor(e.value)
            setValue('instructorId', e.value)
          }}
          className='w-full'
          loading={loadingInstructors}
          invalid={errors?.instructor !== undefined}
        />

        <label>Profesor</label>
      </FloatLabel>
      <Button
        type='submit'
        label='Enviar'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPendingInstructor}
      />
    </form>
  )
}
