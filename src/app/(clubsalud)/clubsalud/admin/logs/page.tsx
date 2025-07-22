'use client'

import { useQuery } from '@tanstack/react-query'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { getLogs } from 'queries/ClubSalud/logs'
import { type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type UserLog } from 'utils/ClubSalud/types'

export default function LogsPage(): ReactElement {
  const { data: logs } = useQuery({ queryKey: ['logs'], queryFn: getLogs })
  return (
    <DataTable
      value={logs}
      scrollable
      scrollHeight='92dvh'
      size='small'
      paginator
      paginatorPosition='bottom'
      alwaysShowPaginator
      rows={20}
    >
      <Column
        field='id'
        header='ID'
      />
      <Column
        field='Account.id'
        header='ID usuario'
      />
      <Column
        field='Account.username'
        header='Usuario'
      />
      <Column
        field='verb'
        header='Verbo'
      />
      <Column
        field='action'
        header='Accion'
      />
      <Column
        field='detail'
        header='Detalles'
      />
      <Column
        field='comment'
        header='Comentarios'
        style={{ minWidth: '300px' }}
      />
      <Column
        field='createdAt'
        header='Fecha'
        style={{ minWidth: '200px' }}
        body={(row: UserLog) => (
          <p>{DateUtils.formatToDDMMYY(row.createdAt)}</p>
        )}
      />
    </DataTable>
  )
}
