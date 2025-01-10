import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { getMembers } from 'queries/ClubSalud/members'
import { createScheduleInscription, getScheduleInscriptionByScheduleId } from 'queries/ClubSalud/scheduleInscription'
import { useEffect, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Schedule } from 'utils/ClubSalud/types'

interface params {
  schedule: Schedule
}
export default function InstructorAssign({ schedule }: params): ReactElement {
  const query = useQueryClient()

  const [membersFitlers, setMembersFilters] = useState<any>(null)
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { data: inscriptions, isPending: loadingInscriptions } = useQuery({
    queryKey: ['inscriptionsById'],
    queryFn: async () => {
      return await getScheduleInscriptionByScheduleId(schedule.id)
    }
  })

  const {
    mutate: mutateScheduleInscription,
    isPending: isPendingScheduleInscription
  } = useMutation({
    mutationFn: async (data: { memberId: number; scheduleId: number }) => {
      return await createScheduleInscription(data)
    },
    async onSuccess(data) {
      await query.refetchQueries({ queryKey: ['inscriptionsById'] })
      await query.refetchQueries({ queryKey: ['inscriptions'] })
      reset()
    }
  })

  useEffect(() => {
    if (members && inscriptions) {
      const filters = members?.filter((member) => {
        return inscriptions.every((inscription) => inscription.memberId !== member.id)
      })
      setMembersFilters(filters)
    }
  }, [members, inscriptions])

  return (
    <form
      action=''
      id='assignMember'
      onSubmit={handleSubmit((data) => {
        mutateScheduleInscription({
          memberId: data.memberId,
          scheduleId: schedule.id
        })
      })}
      className='flex flex-column pt-4 gap-4'
    >
      <FloatLabel>
        <Dropdown
          form='assign'
          options={membersFitlers}
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
          loading={loadingMembers || loadingInscriptions || membersFitlers === null}
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
