import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import AttendanceInstructorForm from './AttendanceInstructorForm'
import { getAttendancesInstructor } from 'queries/attendanceInstructor'

export default function AttendanceAdmTable(): ReactElement {
  const [showAttendance, openAttendance, closeAttendace] = useModal(false)

  const { data: attendances, isPending: loadingAttendances } = useQuery({
    queryKey: ['attendancesInstructor'],
    queryFn: async () => {
      return await getAttendancesInstructor()
    }
  })

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
        value={attendances}
        loading={loadingAttendances}
        scrollable
        scrollHeight='35dvh'
      >
        <Column
          field='class.name'
          header='Clase'
        />
        <Column
          field='instructor.name'
          header='Profesor'
        />
        <Column
          field='instructor.dni'
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
        <AttendanceInstructorForm />
      </Dialog>
    </>
  )
}
