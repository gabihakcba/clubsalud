'use client'

import CreatePaymentForm from 'components/ClubSalud/bills/CreatePaymentForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import HealthPlanBillTable from 'components/ClubSalud/bills/HealthPlanBillTable'
import BillTable from 'components/ClubSalud/bills/BillTable'

export default function Page(): ReactElement {
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  return (
    <Card className='flex flex-column h-auto'>
      <Dialog
        header='Generar Cobro'
        visible={createBill}
        onHide={closeCreateBill}
      >
        <CreatePaymentForm />
      </Dialog>
      <Button
        onClick={openCreateBill}
        size='small'
        label='Generar Cobro'
        icon='pi pi-plus'
        iconPos='right'
        className='fixed z-5'
      />
      <Card style={{ height: '100dvh' }}>
        <BillTable />
      </Card>
      <Card style={{ height: '100dvh' }}>
        <HealthPlanBillTable />
      </Card>
    </Card>
  )
}
