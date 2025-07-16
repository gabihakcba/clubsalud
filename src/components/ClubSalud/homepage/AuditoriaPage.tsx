import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { getAllAudit } from 'queries/ClubSalud/cash-register'
import { type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type CashAudit } from 'utils/ClubSalud/types'
import AuditoriaForm from './AudotiriaForm'
import { useModal } from 'utils/ClubSalud/useModal'

export default function AuditoriaPage(): ReactElement {
  const [showAuditoriaForm, openAuditoriaForm, closeAuditoriaForm] =
  useModal(false)
  const { data: auditData, isFetching } = useQuery({
    queryKey: ['audit'],
    queryFn: async () => {
      const data = await getAllAudit()
      return data
    }
  })
  return (
    <Card>
      <Dialog
        visible={showAuditoriaForm}
        onHide={closeAuditoriaForm}
      >
        <AuditoriaForm />
      </Dialog>
      <DataTable
        value={auditData}
        loading={isFetching}
        scrollable
        scrollHeight='35dvh'
        header={() => {
          return (
            <div className='flex flex-row gap-2 align-items-center justify-content-between'>
              <h3>Auditoria de caja</h3>
              <Button
                size='small'
                outlined
                severity='warning'
                icon='pi pi-plus'
                iconPos='right'
                label='Nueva auditoria'
                onClick={openAuditoriaForm}
              />
            </div>
          )
        }}
      >
        <Column
          header='ID'
          field='id'
        />
        <Column
          header='Fecha'
          field='date'
          body={(row: CashAudit) => <p>{DateUtils.formatToDDMMYY(row.date)}</p>}
        />
        <Column
          header='Efectivo (Libro)'
          field='theoreticalCash'
        />
        <Column
          header='Efectivo (Real)'
          field='realCash'
        />
        <Column
          header='Retiro'
          field='withdrawal'
        />
        <Column
          header='Resto (Libro)'
          field='theoreticalRemainder'
        />
        <Column
          header='Resto (Real)'
          field='realRemainder'
        />
        <Column
          header='Comentario'
          field='comment'
        />
      </DataTable>
    </Card>
  )
}
