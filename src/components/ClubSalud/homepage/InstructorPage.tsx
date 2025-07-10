import RegistrationFormSelector from 'components/ClubSalud/medicalReports/RegistrationFormSelector'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, type ReactElement, useState } from 'react'
import { type Schedule, type Account } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import NewAttendanceInstructorForm from '../attendanceInstructor/NewAttendanceInstructorForm'

export default function InstructorPage({
  account
}: {
  account: Account | undefined
}): ReactElement {
  const [expandedRows, setExpandedRows] = useState<any>(undefined)
  const [charges, setCharges] = useState<Schedule[] | undefined>(undefined)
  const [attendance, openAttendance, closeAttendace] = useModal(false)

  useEffect(() => {
    if (account) {
      setCharges(account?.Instructor?.ScheduleInCharge)
    }
  }, [account])

  const membersInCharge = (data): ReactElement => {
    const schedule: Schedule = data as Schedule
    const scheduleInscription = schedule?.ScheduleInscription?.map((sch) => sch)
    const members = scheduleInscription?.map((sche) => sche.member)
    return (
      <DataTable
        value={members}
        scrollable
        scrollHeight='20vh'
      >
        <Column
          field='dni'
          header='DNI'
        />
        <Column
          field='name'
          header='Nombre'
        />
      </DataTable>
    )
  }

  return (
    <div className='flex flex-column gap-2'>
      <nav className='flex justify-content-end gap-4'>
        <RegistrationFormSelector />
        <Button label='Marcar Asistencia' size='small' outlined onClick={openAttendance}/>
        <Dialog
          onHide={closeAttendace}
          visible={attendance}
        >
          <NewAttendanceInstructorForm/>
        </Dialog>
      </nav>
      <DataTable
        value={charges
          ?.filter((sche: Schedule) => sche.start % 100 === 0)
          ?.sort((sche1: Schedule, sche2: Schedule) => {
            if (sche1.day && sche2.day) {
              if (sche1.day <= sche2.day) {
                return -1
              } else {
                return 1
              }
            } else {
              return 0
            }
          })}
        onRowToggle={(e) => {
          setExpandedRows(e.data)
        }}
        expandedRows={expandedRows}
        rowExpansionTemplate={membersInCharge}
        scrollable
        scrollHeight='60dvh'
        header='Tus clases'
      >
        <Column
          expander={(rowData: Schedule) =>
            rowData.ScheduleInscription?.length !== undefined &&
            rowData.ScheduleInscription?.length > 0
          }
          style={{ width: '5rem' }}
        />
        <Column
          field='class.name'
          header='Clase'
        />
        <Column
          field='start'
          header='Inicia'
        />
        <Column
          field='day'
          header='Día'
        />
      </DataTable>
    </div>
  )
}
