import { type ReactElement } from 'react'
import { type BilledConsultation } from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DateUtils } from 'utils/ClubSalud/dates'

export default function ListBilledConsultations({
  billedConsultations
}: {
  billedConsultations: BilledConsultation[]
}): ReactElement {
  return (
    <>
      <DataTable
        value={billedConsultations}
        header=''
        scrollable
        scrollHeight='30rem'
      >
        <Column
          header='Fecha'
          body={(BilledConsultation: BilledConsultation) => {
            return <span>{DateUtils.formatToDDMMYY(BilledConsultation.date)}</span>
          }}
        />
        <Column
          header='Número de autorización'
          field='autorizationNumber'
        />
      </DataTable>
    </>
  )
}
