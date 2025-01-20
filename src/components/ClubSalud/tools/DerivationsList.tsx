import { useQuery } from '@tanstack/react-query'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getMembers } from 'queries/ClubSalud/members'
import { type ReactElement } from 'react'

export default function DerivationList(): ReactElement {
  const { data: members, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await getMembers()
  })

  return <DataTable value={members} loading={isLoading}>
    <Column header='ID' field='id'/>
    <Column header='Nombre' field='name'/>
    <Column header='Apellido' field='lastName'/>
    <Column header='Derivacion' field='derivedBy'/>
  </DataTable>
}
