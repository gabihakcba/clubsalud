import { useQuery } from '@tanstack/react-query'
import AttendanceForm from 'components/attendance/AttendanceForm'
import CreateNotificationForm from 'components/notifications/CreateNotificationForm'
import MemberSubsTable from 'components/subscriptions/MemberSubsTable'
import RegistrationForm from 'components/medicalReports/RegistrationForm'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import { getMembers } from 'queries/members'
import { getOrderedSubscriptions } from 'queries/subscriptions'
import { type ReactElement, useState } from 'react'
import { useModal } from 'utils/useModal'
import { type Member } from 'utils/types'
import AttendanceInstructorForm from 'components/attendanceInstructor/AttendanceInstructorForm'

const getMember = (members: Member[] | undefined, memberId: number | null): Member | null => {
  if (members && memberId) {
    return members.filter((mem: Member) => mem.id === memberId)[0]
  }
  return null
}

export default function AdminPage(): ReactElement {
  const [showRegistrationForm, openRegistrationForm, closeRegistrationform] =
    useModal(false)
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)
  const [showMemberAttendance, openMemberAttendance, closeMemberAttendace] =
    useModal(false)
  const [showInstructorAttendance, openInstructorAttendance, closeInstructorAttendace] =
    useModal(false)
  const [create, openCreate, closeCreate] = useModal(false)

  const { data: membersSubs } = useQuery({
    queryKey: ['membersSubs'],
    queryFn: async () => {
      const mems = await getOrderedSubscriptions()
      return mems
    }
  })

  const { data: members, isLoading: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  return (
    <div className='flex flex-column'>
      <Dialog
        visible={showRegistrationForm}
        onHide={closeRegistrationform}
        header='Ficha médica'
      >
        <RegistrationForm
          member={getMember(members, selectedMemberId)}
        />
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
        <Dropdown
          placeholder='Ficha médica'
          options={members}
          value={selectedMemberId}
          loading={loadingMembers}
          optionLabel='name'
          optionValue='id'
          filter
          showClear
          onChange={(e) => {
            setSelectedMemberId(e.value as number)
            openRegistrationForm()
          }}
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
