import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import HasRole from 'components/ClubSalud/HasRole'
import MemberAssign from 'components/ClubSalud/schedules/MemberAssign'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { deleteScheduleInscription, getScheduleInscriptionByScheduleId } from 'queries/ClubSalud/scheduleInscription'
import { useState, type ReactElement } from 'react'
import { Permissions, type Schedule } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'

interface params {
  schedule: Schedule
}
export default function ScheduleInscription({
  schedule
}: params): ReactElement {
  const query = useQueryClient()

  const [inscriptionSelected, setInscriptionSelected] = useState<any>(null)
  const [assignMember, openAssignMember, closeAssignMember] = useModal(false)

  const { data: inscriptions, isPending: loadingInscriptions } = useQuery({
    queryKey: ['inscriptions'],
    queryFn: async () => {
      return await getScheduleInscriptionByScheduleId(schedule.id)
    }
  })

  const { mutate: deleteInscription, isPending: isPendingDelete } = useMutation({
    mutationFn: async (inscriptionId: number) => {
      const response = await deleteScheduleInscription(inscriptionId)
      return response
    },
    onSuccess: async (data) => {
      await query.refetchQueries({ queryKey: ['inscriptions'] })
      await query.refetchQueries({ queryKey: ['inscriptionsById'] })
    }
  })

  return (
    <>
      <Dialog
        visible={assignMember}
        onHide={closeAssignMember}
        header='Asignar Clase'
      >
        <HasRole required={[Permissions.ADM, Permissions.OWN]}>
          <MemberAssign schedule={schedule} />
        </HasRole>
      </Dialog>
      <DataTable
        value={inscriptions}
        loading={loadingInscriptions}
        emptyMessage='No hay alumnos inscriptos'
        scrollable
        scrollHeight='20vh'
        header={() => {
          return (
            <div className='flex align-items-center justify-content-center'>
              <Button
                label='Inscribir alumno'
                onClick={openAssignMember}
                size='small'
                icon='pi pi-upload'
                iconPos='right'
                outlined
              />
            </div>
          )
        }}
      >
        <Column
          field='Member.name'
          header='Nombre'
        />
        <Column
          body={(e) => {
            return (
              <Button
                size='small'
                severity='danger'
                icon='pi pi-trash'
                iconPos='right'
                outlined
                loading={isPendingDelete && inscriptionSelected.id === e.id}
                onClick={() => {
                  setInscriptionSelected(e)
                  confirmDialog({
                    message: 'Seguro que quieres desinscribir al alumno?',
                    header: 'Confirmación',
                    icon: 'pi pi-info-circle',
                    defaultFocus: 'reject',
                    acceptClassName: 'p-button-danger',
                    acceptLabel: 'Si',
                    rejectLabel: 'No',
                    accept: () => {
                      deleteInscription(Number(e.id))
                    }
                  })
                }}
              />
            )
          }}
        />
      </DataTable>
    </>
  )
}
