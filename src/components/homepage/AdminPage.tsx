import { useQuery } from '@tanstack/react-query'
import AttendanceForm from 'components/attendance/AttendanceForm'
import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import MemberSubsTable from 'components/subscriptions/MemberSubsTable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { getOrderedSubscriptions } from 'queries/subscriptions'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import AttendanceInstructorForm from 'components/attendanceInstructor/AttendanceInstructorForm'
import RegistrationFormSelector from 'components/medicalReports/RegistrationFormSelector'
import HealthAssignForm from 'components/healthPlans/HealthAssignForm'

export default function AdminPage(): ReactElement {
  const [showAssignHealthPlan, openAssignHealthPlan, closeAssignHealthPlan] =
    useModal(false)
  const [showMemberAttendance, openMemberAttendance, closeMemberAttendace] =
    useModal(false)
  const [
    showInstructorAttendance,
    openInstructorAttendance,
    closeInstructorAttendace
  ] = useModal(false)
  const [create, openCreate, closeCreate] = useModal(false)

  const { data: membersSubs } = useQuery({
    queryKey: ['membersSubs'],
    queryFn: async () => {
      const mems = await getOrderedSubscriptions()
      return mems
    }
  })

  return (
    <div className='flex flex-column'>
      <Dialog
        visible={showAssignHealthPlan}
        onHide={closeAssignHealthPlan}
        header='Asignar Obra Social'
      >
        <HealthAssignForm/>
      </Dialog>
      <Dialog
        visible={showMemberAttendance}
        onHide={closeMemberAttendace}
        header='Asistencia Alumno'
      >
        <AttendanceForm />
      </Dialog>
      <Dialog
        visible={showInstructorAttendance}
        onHide={closeInstructorAttendace}
        header='Asistencia Profesor'
      >
        <AttendanceInstructorForm />
      </Dialog>
      <Dialog
        visible={create}
        onHide={closeCreate}
        header='Crear Notificación'
      >
        <CreateNotificationForm />
      </Dialog>
      <nav className='flex justify-content-end gap-4'>
        <RegistrationFormSelector />
        <Button
          label='Asignar Obra Social'
          size='small'
          outlined
          icon='pi pi-plus'
          iconPos='right'
          onClick={openAssignHealthPlan}
        />
        <Button
          label='Cargar Asistencia Alumno'
          size='small'
          outlined
          icon='pi pi-plus'
          iconPos='right'
          onClick={openMemberAttendance}
        />
        <Button
          label='Cargar Asistencia Profesor'
          size='small'
          outlined
          icon='pi pi-plus'
          iconPos='right'
          onClick={openInstructorAttendance}
        />
        <Button
          label='Crear Notificación'
          size='small'
          outlined
          icon='pi pi-plus'
          iconPos='right'
          onClick={openCreate}
        />
      </nav>
      <main>
        <MemberSubsTable members={membersSubs} />
      </main>
    </div>
  )
}
