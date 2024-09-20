'use client'

import CreatePaymentForm from 'components/bills/CreatePaymentForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'
import { Dialog } from 'primereact/dialog'
import HealthPlanBillTable from 'components/bills/HealthPlanBillTable'
import BillTable from 'components/bills/BillTable'

export default function Page(): ReactElement {
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  return (
    <Card className='flex flex-column h-full'>
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
      />
      <BillTable />
      <HealthPlanBillTable />
    </Card>
  )
}
