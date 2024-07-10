import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { getClasses } from 'queries/classes'
import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Member, type Class_ } from '../../utils/types'
import { getInstructors } from 'queries/instructors'
import { createAttendanceInstructor } from 'queries/attendanceInstructor'

export default function AttendanceInstructorForm(): ReactElement {
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

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['ins'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: createAttendanceInstructor,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['attendancesInstructor'] })
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
        createAtt({ instructorId: data.instructorId, classId: data.classId })
      })}
    >
      <Dropdown
        {...register('instructor', { required: true })}
        value={selectedMember}
        options={instructors}
        optionLabel='name'
        optionValue='id'
        placeholder='Profesor'
        loading={loadingInstructors}
        onChange={(e) => {
          setSelectedMember(e.value as Member)
          setValue('instructorId', e.value as number)
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
