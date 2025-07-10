import { type ReactElement } from 'react'
import { type Member } from 'utils/ClubSalud/types'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export default function MembersList({
  members
}: {
  members: Member[]
}): ReactElement {
  return (
    <div className='flex flex-column gap-4'>
      <DataTable
        value={members}
        scrollable
        scrollHeight='30rem'
      >
        <Column
          header='Apellido'
          field='lastName'
        />
        <Column
          header='Nombre'
          field='name'
        />
        <Column
          header='DNI'
          field='dni'
        />
        <Column
          header='Número'
          field='phoneNumber'
        />
      </DataTable>
    </div>
  )
}
