import { type ReactElement } from 'react'
import { CreateAccountForm } from './CreateAccountForm'
import { useModal } from 'utils/useModal'
import { CreateMemberForm } from 'components/member/CreateMemberForm'
import { CreateInstructorForm } from 'components/instructor/CreateInstructorForm'
import { Button } from 'primereact/button'
import { ButtonGroup } from 'primereact/buttongroup'
import { Dialog } from 'primereact/dialog'
import HasRole from 'components/HasRole'
import { Permissions } from 'utils/types'
import MembersList from 'components/member/MembersList'

export default function AccountTopbar(): ReactElement {
  const [membersList, openMembersList, closeMembersList] = useModal(false)
  const [createAcc, openAcc, closeAcc] = useModal(false)
  const [createMem, openMem, closeMem] = useModal(false)
  const [createIns, openIns, closeIns] = useModal(false)

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
            icon='pi pi-plus'
            onClick={() => {
              openAcc()
            }}
          />
        </HasRole>
        <Button
          label='Profesor'
          icon='pi pi-plus'
          onClick={() => {
            openIns()
          }}
        />
        <Button
          label='Alumno'
          icon='pi pi-plus'
          onClick={() => {
            openMem()
          }}
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
    </div>
  )
}
