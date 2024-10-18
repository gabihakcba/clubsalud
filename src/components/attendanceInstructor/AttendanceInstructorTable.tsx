import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import AttendanceInstructorForm from './AttendanceInstructorForm'
import { getInstructors } from 'queries/instructors'
import { useState } from 'react'
import { argDate2Format } from '../../utils/dates'

export default function AttendanceAdmTable(): ReactElement {
  const [showAttendance, openAttendance, closeAttendace] = useModal(false)
  const [expandedRows, setExpandedRows] = useState<any>(null)

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const allowExpansion = (rowData): boolean => {
    return rowData.attendanceInstructor.length > 0
  }

  const rowExpansionTemplate = (data): ReactElement => {
    return (
      <DataTable
        value={data.attendanceInstructor}
        scrollable
        scrollHeight='20dvh'
      >
        <Column
          field='date'
          header='Fecha'
          body={(data) => <div>{argDate2Format(data.date as Date)}</div>}
          sortable
        />
        <Column
          field='class.name'
          header='Clase'
          sortable
        />
        <Column
          field='hours'
          header='Horas'
          sortable
        />
        <Column />
      </DataTable>
    )
  }

  return (
    <>
      <DataTable
        header={() => {
          return (
            <div className='w-full flex align-items-center justify-content-between'>
              <h2>Asistencias de profesor</h2>
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
        value={instructors}
        loading={loadingInstructors}
        scrollable
        scrollHeight='35dvh'
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data)
        }}
        rowExpansionTemplate={rowExpansionTemplate}
        // dataKey="id"
      >
        <Column
          expander={allowExpansion}
          style={{ width: '5rem' }}
        />
        <Column
          field='name'
          header='Nombre'
        />
        <Column
          field='dni'
          header='DNI'
        />
      </DataTable>
      <Dialog
        visible={showAttendance}
        onHide={closeAttendace}
        header='Asistencia'
      >
        <AttendanceInstructorForm />
      </Dialog>
    </>
  )
}
