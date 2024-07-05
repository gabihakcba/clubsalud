import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { getMembers } from 'queries/members'
import { createScheduleInscription } from 'queries/scheduleInscription'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Schedule } from 'utils/types'

interface params {
  schedule: Schedule
}
export default function InstructorAssign({ schedule }: params): ReactElement {
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const query = useQueryClient()

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  const {
    mutate: mutateScheduleInscription,
    isPending: isPendingScheduleInscription
  } = useMutation({
    mutationFn: async (data: { memberId: number; scheduleId: number }) => {
      return await createScheduleInscription(data)
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
        // mutateScheduleInscription({
        //   memberId: data.memberId,
        //   scheduleId: schedule.id
        // })
        console.log({
          memberId: data.memberId,
          scheduleId: schedule.id
        })
      })}
      className='flex flex-column pt-4 gap-4'
    >
      <FloatLabel>
        <Dropdown
          form='assign'
          options={members}
          optionLabel='name'
          optionValue='id'
          filter
          value={selectedMember}
          {...register('member', {
            required: {
              value: true,
              message: 'El nombre del profesor es requerido'
            }
          })}
          onChange={(e) => {
            setSelectedMember(e.value)
            setValue('memberId', e.value)
          }}
          className='w-full'
          loading={loadingMembers}
          invalid={errors?.member !== undefined}
        />

        <label>Alumno</label>
      </FloatLabel>
      <Button
        type='submit'
        label='Enviar'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
        loading={isPendingScheduleInscription}
      />
    </form>
  )
}
