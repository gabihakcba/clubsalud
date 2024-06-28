import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { createAttendance } from 'queries/attendance'
import { getClasses } from 'queries/classes'
import { getMembers } from 'queries/members'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Class_, type Member } from 'utils/types'

export default function AttendanceForm(): ReactElement {
  const query = useQueryClient()

  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [selectedClass, setSelectedClass] = useState<Class_ | null>(null)

  const { register, handleSubmit, setValue } = useForm()

  const { data: classes, isPending: loadingClasses } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      return await getClasses()
    }
  })

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['mem'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: createAttendance,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['attendances'] })
    },
    onError: (data) => {
      console.log('error: ', data)
    }
  })

  return (
    <form
      action=''
      className='flex flex-column gap-4'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        createAtt({ memberId: data.memberId, classId: data.classId })
      })}
    >
      <Dropdown
        {...register('member', { required: true })}
        value={selectedMember}
        options={members}
        optionLabel='name'
        optionValue='id'
        placeholder='Alumno'
        loading={loadingMembers}
        onChange={(e) => {
          setSelectedMember(e.value as Member)
          setValue('memberId', e.value as number)
        }}
      />
      <Dropdown
        {...register('class', { required: true })}
        value={selectedClass}
        options={classes}
        optionLabel='name'
        optionValue='id'
        placeholder='Clase'
        loading={loadingClasses}
        onChange={(e) => {
          setSelectedClass(e.value as Class_)
          setValue('classId', e.value as number)
        }}
      />
      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        outlined
        size='small'
        loading={isPendingAtt}
      />
    </form>
  )
}
