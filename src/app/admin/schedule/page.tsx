'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import ClassAssign from 'components/schedules/ClassAssign'
import InstructorAssign from 'components/schedules/InstructorAssign'
import { Card } from 'primereact/card'
import { Chip } from 'primereact/chip'
import { Column } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import { useState, type ReactElement } from 'react'
import { path } from 'utils/path'
import { type Schedule } from 'utils/types'
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
    { start: 1500, end: 1630, classes: [] },
    { start: 1630, end: 1700, classes: [] },
    { start: 1700, end: 1730, classes: [] },
    { start: 1730, end: 1800, classes: [] }
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
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)
  const [assignClass, openAssingClass, closeAssignClass] = useModal(false)
  const [assignInstructor, openAssignInstructor, closeAssignInstructor] =
    useModal(false)

  const queryClient = useQueryClient()
  void queryClient.invalidateQueries({ queryKey: ['sch'] })

  const { data } = useQuery({
    queryKey: ['sch'],
    queryFn: async (): Promise<Schedule[]> => {
      const response = await fetch(`${path()}/api/schedules`, {
        next: { revalidate: 0 },
        cache: 'no-store'
      })
      const data = await response.json()
      return data
    }
  })

  return (
    <Card className='h-full'>
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
      <ConfirmDialog />
      <DataTable
        value={formatScheduler(data ?? [])}
        scrollable
        scrollHeight='80vh'
        cellSelection
        selectionMode='single'
        onSelectionChange={(e) => {
          setSelectedSchedule(e.value.rowData.classes[e.value.cellIndex - 1])
          confirmDialog({
            header: 'Asignar ...',
            message: 'Seleccione que desea asignar',
            acceptLabel: 'Clase',
            rejectLabel: 'Profesor',
            accept() {
              openAssingClass()
            },
            reject() {
              openAssignInstructor()
            }
          })
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
                <p>{sch.classes[0]?.class?.name ?? sch.classes[0]?.day}</p>
                <Chip label={sch.classes[0]?.charge?.name ?? 'Profesor'} />
              </div>
            )
          }}
          header='Lunes'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[1]?.class?.name ?? sch.classes[1]?.day}</p>
              <Chip label={sch.classes[1]?.charge?.name ?? 'Profesor'} />
            </div>
          )}
          header='Martes'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[2]?.class?.name ?? sch.classes[2]?.day}</p>
              <Chip label={sch.classes[2]?.charge?.name ?? 'Profesor'} />
            </div>
          )}
          header='Miércoles'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[3]?.class?.name ?? sch.classes[3]?.day}</p>
              <Chip label={sch.classes[3]?.charge?.name ?? 'Profesor'} />
            </div>
          )}
          header='Jueves'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[4]?.class?.name ?? sch.classes[4]?.day}</p>
              <Chip label={sch.classes[4]?.charge?.name ?? 'Profesor'} />
            </div>
          )}
          header='Viernes'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[5]?.class?.name ?? sch.classes[5]?.day}</p>
              <Chip label={sch.classes[5]?.charge?.name ?? 'Profesor'} />
            </div>
          )}
          header='Sábado'
        />
        <Column
          body={(sch) => (
            <div className='flex align-items-center gap-2'>
              <p>{sch.classes[6]?.class?.name ?? sch.classes[6]?.day}</p>
              <Chip label={sch.classes[6]?.charge?.name ?? 'Profesor'} />
            </div>
          )}
          header='Domingo'
        />
      </DataTable>
    </Card>
  )
}
