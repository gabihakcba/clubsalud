import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { createAttendance, getAttendances } from 'queries/attendance'
import { getClasses } from 'queries/classes'
import { getMembers } from 'queries/members'
import { type ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Class_, type Member } from 'utils/types'
import { useModal } from 'utils/useModal'

export default function AttendanceAdmTable(): ReactElement {
  const [showAttendance, openAttendance, closeAttendace] = useModal(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [selectedClass, setSelectedClass] = useState<Class_ | null>(null)

  const { register, handleSubmit, setValue } = useForm()

  const {
    data: attendances,
    isPending: loadingAttendances,
    refetch
  } = useQuery({
    queryKey: ['attendances'],
    queryFn: async () => {
      return await getAttendances()
    }
  })

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
      await refetch()
    },
    onError: (data) => {
      console.log('error: ', data)
    }
  })

  return (
    <>
      <DataTable
        header={() => {
          return (
            <div className='w-full flex align-items-center justify-content-between'>
              <h2>Asistencias</h2>
              <Button
                label='Cargar asistencia'
                size='small'
                outlined
                icon='pi pi-plus'
                iconPos='right'
                onClick={openAttendance}
              />
            </div>
          )
        }}
        value={attendances}
        loading={loadingAttendances}
        scrollable
        scrollHeight='80dvh'
      >
        <Column
          field='id'
          header='ID'
        />
        <Column
          field='class.name'
          header='Clase'
        />
        <Column
          field='member.name'
          header='Alumno'
        />
        <Column
          field='member.dni'
          header='DNI'
        />
        <Column
          field='date'
          header='Fecha'
        />
      </DataTable>
      <Dialog
        visible={showAttendance}
        onHide={closeAttendace}
        header='Asistencia'
      >
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
      </Dialog>
    </>
  )
}
