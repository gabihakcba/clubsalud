import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { createAttendance } from 'queries/ClubSalud/attendance'
import { getMembers } from 'queries/ClubSalud/members'
import { useEffect, useRef, useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { type Member } from '../../../utils/ClubSalud/types'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { type AxiosError } from 'axios'
import { Toast } from 'primereact/toast'

const getMember = (dni: number, members: Member[]): Member | undefined =>
  members.find((member: Member) => member.dni.toString() === dni.toString())

export default function NewAttendanceMember(): ReactElement {
  const toast = useRef<Toast>(null)

  const query = useQueryClient()

  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  )
  const [label, setLabel] = useState('DNI')

  const {
    handleSubmit
  } = useForm()

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['mem'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  const { mutate: createAtt, isPending: isPendingAtt } = useMutation({
    mutationFn: async (data: {
      memberId: number
    }) => {
      return await createAttendance(data)
    },
    onSuccess: async (data) => {
      await query.refetchQueries({ queryKey: ['attendances'] })
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Asistencia marcada correctamente',
          detail: JSON.stringify(data),
          life: 3000,
          sticky: true
        })
      }
    },
    onError: (data: AxiosError) => {
      console.log(data.response)
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error al crear asistencia',
          detail: String(data.response?.data),
          life: 3000,
          sticky: true
        })
      }
    }
  })

  useEffect(() => {
    setLabel(selectedMember?.name ?? 'DNI')
  }, [selectedMember])

  return (
    <form
      action=''
      className='flex flex-column gap-4 justify-content-between'
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault()
        const params = {
          memberId: Number(selectedMember?.id)
        }
        createAtt(params)
      })}
    >
      <Toast ref={toast} position='top-left'/>
      <div className='flex flex-column gap-4'>
        <FloatLabel>
          <InputNumber
            disabled={loadingMembers}
            onChange={(e) => {
              if (e.value) {
                const member = getMember(e.value, members ?? [])
                setSelectedMember(member)
              }
            }}
          />
          <label htmlFor=''>{label}</label>
        </FloatLabel>
      </div>

      <div className='flex flex-column gap-2'>
        <Button
          label='Enviar'
          icon='pi pi-upload'
          iconPos='right'
          outlined
          size='small'
          loading={isPendingAtt}
          disabled={!selectedMember}
        />
      </div>
    </form>
  )
}
