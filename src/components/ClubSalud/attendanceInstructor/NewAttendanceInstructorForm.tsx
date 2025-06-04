import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { useEffect, useRef, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Instructor } from '../../../utils/ClubSalud/types'
import { getInstructors } from 'queries/ClubSalud/instructors'
import { createAttendanceInstructor } from 'queries/ClubSalud/attendanceInstructor'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { type AxiosError } from 'axios'

export default function NewAttendanceInstructorForm(): ReactElement {
  const query = useQueryClient()
  const toast = useRef<Toast>(null)

  const [selectedInstructor, setSelectedInstructor] = useState<
  Instructor | undefined
  >()

  const [label, setLabel] = useState('DNI')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    setLabel(selectedInstructor?.name ?? 'DNI')
  }, [selectedInstructor])

  const getInstructor = (
    dni: number,
    instructors: Instructor[]
  ): Instructor | undefined =>
    instructors.find((ins: Instructor) => ins.dni.toString() === dni.toString())

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['ins'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: createAttendanceInstructor,
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['instructors'] })
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Asistencia marcada correctamente',
          life: 3000,
          sticky: true
        })
      }
    },
    onError: (data: AxiosError) => {
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error al crear pago',
          life: 3000,
          sticky: true
        })
      }
    }
  })

  return (
    <form
      action=''
      className='flex flex-column gap-4 justify-content-between'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        createAtt({
          instructorId: Number(selectedInstructor?.id),
          classId: data.classId,
          date: data.date,
          hours: data.hours
        })
      })}
    >
      <Toast
        ref={toast}
        position='top-left'
      />
      <div className='flex flex-column gap-4'>
        <FloatLabel>
          <InputNumber
            disabled={loadingInstructors}
            onChange={(e) => {
              if (e.value) {
                const instructor = getInstructor(e.value, instructors ?? [])
                setSelectedInstructor(instructor)
              }
            }}
          />
          <label htmlFor=''>{label}</label>
        </FloatLabel>

        <FloatLabel>
          <InputNumber
            {...register('hours', {
              required: true
            })}
            invalid={errors?.hours !== undefined}
            max={99}
            min={1}
            onChange={(e) => {
              setValue('hours', e.value ? Number(e.value) : null)
            }}
          />
          <label htmlFor=''>Horas</label>
        </FloatLabel>
      </div>

      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        outlined
        size='small'
        disabled={!selectedInstructor}
        loading={isPendingAtt}
      />
    </form>
  )
}
