import { useState, type ReactElement } from 'react'
import { type Subscription } from 'utils/ClubSalud/types'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DateUtils } from 'utils/ClubSalud/dates'
import ListBilledConsultations from './ListBilledConsultations'
import { Dialog } from 'primereact/dialog'
import HealthPlanBillForm from '../bills/HealthPlanBillForm'
import { useModal } from 'utils/ClubSalud/useModal'
import { Button } from 'primereact/button'

export default function ListSubscriptions({
  subscriptions,
  header
}: {
  subscriptions: Subscription[]
  header: string
}): ReactElement {
  const [expandedRows, setExpandedRows] = useState<Subscription[]>([])
  const [selectedSubscription, setSelectedSubscription] = useState<
  Subscription | undefined
  >()
  const [bill, openBill, closeBill] = useModal(false)

  const allowExpansion = (subscription: Subscription): boolean => {
    return (subscription.BilledConsultation?.length ?? 0) > 0
  }

  return (
    <>
      <Dialog
        onHide={closeBill}
        visible={bill}
        header={selectedSubscription?.id}
      >
        {selectedSubscription && (
          <HealthPlanBillForm subscription={selectedSubscription} />
        )}
      </Dialog>
      <DataTable
        value={subscriptions}
        header={header}
        emptyMessage='No hay suscripciones para mostrar'
        scrollable
        scrollHeight='30rem'
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data as Subscription[])
        }}
        rowExpansionTemplate={(subscription) => (
          <ListBilledConsultations
            billedConsultations={subscription.BilledConsultation ?? []}
          />
        )}
      >
        <Column
          expander={allowExpansion}
          style={{ width: '5rem' }}
        />
        <Column
          header='ID'
          field='id'
          body={(subscription) => <span>{subscription.id}</span>}
        />
        <Column
          header='Oferta'
          field='plan.title'
        />
        <Column
          header='Plan'
          field='promotion.title'
        />
        <Column
          header='Desde'
          body={(subscription: Subscription) => (
            <span>{DateUtils.formatToDDMMYY(subscription.initialDate)}</span>
          )}
        />
        <Column
          header='Hasta'
          body={(subscription: Subscription) => (
            <span>
              {DateUtils.formatToDDMMYY(
                DateUtils.newDate(subscription.expirationDate ?? '')
              )}
            </span>
          )}
        />
        <Column
          header='Nombre'
          field='member.name'
        />
        <Column
          header='Apellido'
          field='member.lastName'
        />
        <Column
          header='DNI'
          field='member.dni'
        />
        <Column
          header='Teléfono'
          field='member.phoneNumber'
        />
        <Column
          body={(subscription: Subscription) => (
            <Button
              label='Cargar pago'
              size='small'
              outlined
              icon='pi pi-plus'
              severity='danger'
              iconPos='right'
              onClick={() => {
                setSelectedSubscription(subscription)
                openBill()
              }}
            />
          )}
        />
      </DataTable>
    </>
  )
}
