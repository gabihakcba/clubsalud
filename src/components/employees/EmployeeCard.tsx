import HasRole from 'components/HasRole'
import { type ReactElement } from 'react'
import { Permissions, type Employee } from 'utils/types'

interface params {
  employee: Employee
}
export default function EmployeeCard({ employee }: params): ReactElement {
  return (
    <div className='flex flex-col gap-2 border rounded p-2'>
      <h5 className='font-bold'>
        {employee.name} {employee.lastName}
      </h5>
      <HasRole required={[Permissions.OWN]}>
        <p>${employee.salary}</p>
        {employee.alias && <p>Alias: {employee.alias}</p>}
        {employee.cbu !== undefined && <p>CBU: {String(employee.cbu)}</p>}
      </HasRole>
      <div className='flex gap-2'>
        <button className='light-blue-border-button text-sm'>Editar</button>
        <button className='light-red-border-button text-sm'>Eliminar</button>
      </div>
    </div>
  )
}
