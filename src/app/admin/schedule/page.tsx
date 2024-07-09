'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import HasRole from 'components/HasRole'
import ScheduleInscription from 'components/scheduleInscription/ScheduleInscription'
import ClassAssign from 'components/schedules/ClassAssign'
import InstructorAssign from 'components/schedules/InstructorAssign'
import { Button } from 'primereact/button'
import { ButtonGroup } from 'primereact/buttongroup'
import { Card } from 'primereact/card'
import { Chip } from 'primereact/chip'
import { Column } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import { clearSchedule, getSchedules } from 'queries/schedules'
import { useState, type ReactElement } from 'react'
import { hasPermission } from 'utils/auth'
import { Permissions, type Schedule } from 'utils/types'
import { useModal } from 'utils/useModal'

const formatHour = (hour: number): string => {
  return `${Math.floor(hour / 100)}:${hour % 100 > 0 ? hour % 100 : '00'}`
}

interface scheduleType {
  start: number
  end: number
  classes: Schedule[]
}

const formatScheduler = (schedules: Schedule[]): any[] => {
  const schedule: scheduleType[] = [
    { start: 800, end: 830, classes: [] },
    { start: 830, end: 900, classes: [] },
    { start: 900, end: 930, classes: [] },
    { start: 930, end: 1000, classes: [] },
    { start: 1000, end: 1030, classes: [] },
    { start: 1030, end: 1100, classes: [] },
    { start: 1100, end: 1130, classes: [] },
    { start: 1130, end: 1200, classes: [] },
    { start: 1200, end: 1230, classes: [] },
    { start: 1230, end: 1300, classes: [] },
    { start: 1300, end: 1330, classes: [] },
    { start: 1330, end: 1400, classes: [] },
    { start: 1400, end: 1430, classes: [] },
    { start: 1430, end: 1500, classes: [] },
    { start: 1500, end: 1530, classes: [] },
    { start: 1530, end: 1600, classes: [] },
    { start: 1600, end: 1630, classes: [] },
    { start: 1630, end: 1700, classes: [] },
    { start: 1700, end: 1730, classes: [] },
    { start: 1730, end: 1800, classes: [] },
    { start: 1800, end: 1830, classes: [] },
    { start: 1830, end: 1900, classes: [] },
    { start: 1900, end: 1930, classes: [] },
    { start: 1930, end: 2000, classes: [] }
  ]

  schedule.forEach((sch) => {
    schedules.forEach((sch2) => {
      if (sch.start === sch2.start) {
        sch.classes.push(sch2)
      }
    })
  })
  return schedule
}

export default function Schelude(): ReactElement {
  const [selectedSchedule, setSelectedSchedule] = useState<any>(undefined)
  const [assignClass, openAssingClass, closeAssignClass] = useModal(false)
  const [assignInstructor, openAssignInstructor, closeAssignInstructor] =
    useModal(false)
  const [showOptions, openShowOptions, closeShowOptions] = useModal(false)
  const [
    membersInscripted,
    openMembersInscripted,
    closeMembersInscripted
  ] = useModal(false)

  const queryClient = useQueryClient()
  void queryClient.invalidateQueries({ queryKey: ['sch'] })

  const { data, refetch } = useQuery({
    queryKey: ['sch'],
    queryFn: async (): Promise<Schedule[]> => {
      return await getSchedules()
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: clearSchedule,
    onSuccess: async () => {
      await refetch()
    }
  })

  return (
    <Card className='h-full'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <Dialog
          visible={assignClass}
          onHide={closeAssignClass}
          header='Asignar Clase'
        >
          <ClassAssign schedule={selectedSchedule} />
        </Dialog>
        <Dialog
          visible={assignInstructor}
          onHide={closeAssignInstructor}
          header='Asignar Profesor'
        >
          <InstructorAssign schedule={selectedSchedule} />
        </Dialog>
        <Dialog
          visible={membersInscripted}
          onHide={closeMembersInscripted}
          header='Alumnos inscriptos'
        >
          <ScheduleInscription schedule={selectedSchedule}/>
        </Dialog>
        <Dialog
          visible={showOptions}
          onHide={closeShowOptions}
          header='Opciones'
        >
          <ButtonGroup>
            <Button
              label='Clase'
              size='small'
              outlined
              icon='pi pi-calendar-plus'
              iconPos='right'
              onClick={openAssingClass}
            />
            <Button
              label='Profesor'
              size='small'
              outlined
              icon='pi pi-user'
              iconPos='right'
              onClick={openAssignInstructor}
            />
            <Button
              label='Alumnos'
              size='small'
              outlined
              icon='pi pi-users'
              iconPos='right'
              onClick={openMembersInscripted}
            />
            <Button
              label='Limpiar'
              size='small'
              outlined
              icon='pi pi-trash'
              iconPos='right'
              severity='danger'
              loading={isPending}
              onClick={() => {
                confirmDialog({
                  message: 'Seguro que quieres resetear este horario?',
                  header: 'Confirmación',
                  icon: 'pi pi-info-circle',
                  defaultFocus: 'reject',
                  acceptClassName: 'p-button-danger',
                  acceptLabel: 'Si',
                  rejectLabel: 'No',
                  accept: () => {
                    mutate(selectedSchedule.id as number)
                  }
                })
              }}
            />
          </ButtonGroup>
        </Dialog>
        <ConfirmDialog />
      </HasRole>

      <DataTable
        value={formatScheduler(data ?? [])}
        scrollable
        scrollHeight='80vh'
        cellSelection
        selectionMode='single'
        onSelectionChange={async (e) => {
          const selected = e.value.rowData.classes[e.value.cellIndex - 1]
          setSelectedSchedule(selected)
          if (await hasPermission([Permissions.ADM, Permissions.OWN])) {
            openShowOptions()
          }
        }}
        header={() => <h2>Horarios</h2>}
      >
        <Column
          body={(e) => (
            <div className='flex gap-4'>
              <Tag
                value={formatHour(e.start as number)}
                severity='warning'
              />
              <Tag
                value={formatHour(e.end as number)}
                severity='warning'
              />
            </div>
          )}
          header='Horario'
        />
        <Column
          body={(sch) => {
            return (
              <div className='flex align-items-center gap-2'>
                {sch.classes[0]?.class?.name && (
                  <Tag
                    value={sch.classes[0]?.class?.name}
                    severity='success'
                  />
                )}
                {!sch.classes[0]?.class?.name && <p>{sch.classes[0]?.day}</p>}
                {sch.classes[0]?.charge?.name && (
                  <Tag value={sch.classes[0]?.charge?.name} />
                )}
                {!sch.classes[0]?.charge?.name && <Chip label='Profesor' />}
              </div>
            )
          }}
          header='Lunes'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              {sch.classes[1]?.class?.name && (
                <Tag
                  value={sch.classes[1]?.class?.name}
                  severity='success'
                />
              )}
              {!sch.classes[1]?.class?.name && <p>{sch.classes[1]?.day}</p>}
              {sch.classes[1]?.charge?.name && (
                <Tag value={sch.classes[1]?.charge?.name} />
              )}
              {!sch.classes[1]?.charge?.name && <Chip label='Profesor' />}
            </div>
          )}
          header='Martes'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              {sch.classes[2]?.class?.name && (
                <Tag
                  value={sch.classes[2]?.class?.name}
                  severity='success'
                />
              )}
              {!sch.classes[2]?.class?.name && <p>{sch.classes[2]?.day}</p>}
              {sch.classes[2]?.charge?.name && (
                <Tag value={sch.classes[2]?.charge?.name} />
              )}
              {!sch.classes[2]?.charge?.name && <Chip label='Profesor' />}
            </div>
          )}
          header='Miércoles'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              {sch.classes[3]?.class?.name && (
                <Tag
                  value={sch.classes[3]?.class?.name}
                  severity='success'
                />
              )}
              {!sch.classes[3]?.class?.name && <p>{sch.classes[3]?.day}</p>}
              {sch.classes[3]?.charge?.name && (
                <Tag value={sch.classes[3]?.charge?.name} />
              )}
              {!sch.classes[3]?.charge?.name && <Chip label='Profesor' />}
            </div>
          )}
          header='Jueves'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              {sch.classes[4]?.class?.name && (
                <Tag
                  value={sch.classes[4]?.class?.name}
                  severity='success'
                />
              )}
              {!sch.classes[4]?.class?.name && <p>{sch.classes[4]?.day}</p>}
              {sch.classes[4]?.charge?.name && (
                <Tag value={sch.classes[4]?.charge?.name} />
              )}
              {!sch.classes[4]?.charge?.name && <Chip label='Profesor' />}
            </div>
          )}
          header='Viernes'
        />
        {/* <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[5]?.class?.name ?? sch.classes[5]?.day}</p>
              {sch.classes[0]?.charge?.name && (
                <Tag value={sch.classes[0]?.charge?.name} />
              )}
              {!sch.classes[0]?.charge?.name && <Chip label='Profesor' />}
            </div>
          )}
          header='Sábado'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[6]?.class?.name ?? sch.classes[6]?.day}</p>
              {sch.classes[0]?.charge?.name && (
                <Tag value={sch.classes[0]?.charge?.name} />
              )}
              {!sch.classes[0]?.charge?.name && <Chip label='Profesor' />}
            </div>
          )}
          header='Domingo'
        /> */}
      </DataTable>
    </Card>
  )
}
