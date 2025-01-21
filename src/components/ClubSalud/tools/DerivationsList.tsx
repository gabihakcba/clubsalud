import { useQuery } from '@tanstack/react-query'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getMembers } from 'queries/ClubSalud/members'
import { type ReactElement } from 'react'
import { type Member } from 'utils/ClubSalud/types'

export default function DerivationList(): ReactElement {
  const { data: members, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await getMembers()
  })

  const getList = (members: Member[]): any => {
    return Object.values(
      members.reduce((acc, item) => {
        if (!acc[item.derivedBy]) {
          acc[item.derivedBy] = { derivedBy: item.derivedBy, total: 0 }
        }
        acc[item.derivedBy].total++
        return acc
      }, {})
    )
  }

  return (
    <DataTable
      value={getList(members ?? [])}
      loading={isLoading}
    >
      <Column
        header='Derivado por'
        field='derivedBy'
      />
      <Column
        header='Total'
        field='total'
      />
    </DataTable>
  )
}
