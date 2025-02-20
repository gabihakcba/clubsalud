import { type ReactElement } from 'react'
import { CreateAccountForm } from './CreateAccountForm'
import { useModal } from 'utils/ClubSalud/useModal'
import { CreateMemberForm } from 'components/ClubSalud/member/CreateMemberForm'
import { CreateInstructorForm } from 'components/ClubSalud/instructor/CreateInstructorForm'
import { Button } from 'primereact/button'
import { ButtonGroup } from 'primereact/buttongroup'
import { Dialog } from 'primereact/dialog'
import HasRole from 'components/ClubSalud/HasRole'
import { Permissions } from 'utils/ClubSalud/types'
import MembersList from 'components/ClubSalud/member/MembersList'
import CreateEmployeeForm from '../employees/CreateEmployeeForm'

export default function AccountTopbar(): ReactElement {
  const [membersList, openMembersList, closeMembersList] = useModal(false)
  const [createAcc, openAcc, closeAcc] = useModal(false)
  const [createMem, openMem, closeMem] = useModal(false)
  const [createIns, openIns, closeIns] = useModal(false)
  const [createEmp, openEmp, closeEmp] = useModal(false)

  return (
    <div className='flex flex-row gap-2'>
      <Dialog
        visible={membersList}
        onHide={closeMembersList}
        header='Listado de alumnos'
      >
        <MembersList />
      </Dialog>
      <ButtonGroup>
        <HasRole required={[Permissions.OWN]}>
          <Button
            label='Cuenta'
            size='small'
            icon='pi pi-plus'
            onClick={openAcc}
          />
        </HasRole>
        <Button
          label='Profesor'
          size='small'
          icon='pi pi-plus'
          onClick={openIns}
        />
        <Button
          label='Alumno'
          size='small'
          icon='pi pi-plus'
          onClick={openMem}
        />
        <Button
          onClick={openEmp}
          label='Empleado'
          size='small'
          icon='pi pi-plus'
          iconPos='right'
        />
      </ButtonGroup>
      <Button
        label='Listado de alumnos'
        size='small'
        outlined
        icon='pi pi-list'
        iconPos='right'
        severity='success'
        onClick={openMembersList}
      />
      <Dialog
        header='Crear Cuenta'
        visible={createAcc}
        onHide={closeAcc}
      >
        <CreateAccountForm />
      </Dialog>
      <Dialog
        header='Crear Perfil Profesor'
        visible={createIns}
        onHide={closeIns}
      >
        <CreateInstructorForm />
      </Dialog>
      <Dialog
        header='Crear Perfil Alumno'
        visible={createMem}
        onHide={closeMem}
      >
        <CreateMemberForm />
      </Dialog>
      <Dialog
        header='Crear Perfil Empleado'
        visible={createEmp}
        onHide={closeEmp}
      >
        <CreateEmployeeForm />
      </Dialog>
    </div>
  )
}
