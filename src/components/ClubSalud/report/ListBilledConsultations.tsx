import { type ReactElement } from 'react'
import { type BilledConsultation } from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { argDate2Format } from 'utils/ClubSalud/dates'

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
          body={(billedConsultation: BilledConsultation) => {
            return <span>{argDate2Format(billedConsultation.date)}</span>
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
