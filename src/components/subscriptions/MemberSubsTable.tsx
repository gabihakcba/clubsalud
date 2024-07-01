import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { type ReactElement, useState } from 'react'
import { type Member } from 'utils/types'
import SubscriptionTable from './SubscriptionsTable'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'

export default function MemberSubsTable({
  members
}: {
  members: Member[] | undefined
}): ReactElement {
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const [memberSelected, setMemberSelected] = useState<any>(null)

  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.STARTS_WITH }
  })
  return (
    <DataTable
      value={members}
      scrollable
      scrollHeight='60dvh'
      onRowToggle={(e) => {
        setMemberSelected(e.data)
      }}
      expandedRows={memberSelected}
      rowExpansionTemplate={(memberSelected) => (
        <SubscriptionTable member={memberSelected} />
      )}
      filters={filters}
      dataKey='id'
      globalFilterFields={['dni']}
      header={() => (
        <InputText
          value={globalFilterValue}
          onChange={(e) => {
            const oldFilters = filters
            oldFilters.global.value = e.target.value
            setFilters(oldFilters)
            setGlobalFilterValue(e.target.value)
          }}
          placeholder='DNI'
        />
      )}
    >
      <Column
        expander
        style={{ width: '5rem' }}
      />
      <Column
        field='id'
        header='ID'
      />
      <Column
        field='name'
        header='Nombre'
      />
      <Column
        field='dni'
        header='DNI'
      />
    </DataTable>
  )
}
