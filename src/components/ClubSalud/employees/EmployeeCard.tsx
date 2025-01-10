import HasRole from 'components/ClubSalud/HasRole'
import Modal from 'components/ClubSalud/Modal'
import { type ReactElement } from 'react'
import { Permissions, type Employee } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import UpdateEmployeeForm from './UpdateEmployeeForm'

interface params {
  employee: Employee
}
export default function EmployeeCard({ employee }: params): ReactElement {
  const [edit, openEdit, closeEdit] = useModal(false)
  return (
    <div className='flex flex-col gap-2 border rounded p-2 justify-between'>
      <h5 className='font-bold'>
        {employee.name} {employee.lastName}
      </h5>
      <HasRole required={[Permissions.OWN]}>
        <p>${employee.salary}</p>
        {employee.alias && <p>Alias: {employee.alias}</p>}
        {employee.cbu !== undefined && <p>CBU: {String(employee.cbu)}</p>}
      </HasRole>
      <HasRole required={[Permissions.OWN]}>
        <div className='flex gap-2'>
          <button
            className='light-blue-border-button text-sm'
            onClick={openEdit}
          >
            Info
          </button>
          <Modal
            isOpen={edit}
            closeModal={closeEdit}
          >
            <UpdateEmployeeForm employee={employee}></UpdateEmployeeForm>
          </Modal>
          {/* <button className='light-red-border-button text-sm'>Eliminar</button> */}
        </div>
      </HasRole>
    </div>
  )
}
