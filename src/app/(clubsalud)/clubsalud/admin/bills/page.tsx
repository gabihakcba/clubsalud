'use client'

import CreatePaymentForm from 'components/ClubSalud/bills/CreatePaymentForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { useState, type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import HealthPlanBillTable from 'components/ClubSalud/bills/HealthPlanBillTable'
import BillTable from 'components/ClubSalud/bills/BillTable'
import MonthBills from 'components/ClubSalud/bills/MonthBills'
import { TabMenu } from 'primereact/tabmenu'

export default function Page(): ReactElement {
  const [createBill, openCreateBill, closeCreateBill] = useModal(false)
  const [monthBills, openMonthBills, closeMonthBills] = useModal(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const items = [
    { label: 'Cobros Particulares', icon: '' },
    { label: 'Cobros de Obra Social', icon: '' }
  ]

  const renderComponent = (index: number): ReactElement => {
    switch (index) {
      case 0:
        return <BillTable />
      case 1:
        return <HealthPlanBillTable />
      default:
        return <h2>Elemento no seleccionado</h2>
    }
  }

  return (
    <Card
      className='flex flex-column h-screen gap-4 p-0'
      header={() => {
        return (
          <div className='flex gap-4 fixed z-5'>
            <Button
              onClick={openCreateBill}
              size='small'
              label='Generar Cobro'
              icon='pi pi-plus'
              iconPos='right'
            />
            <Button
              onClick={openMonthBills}
              size='small'
              label='Cobros del mes'
              icon='pi pi-list'
              iconPos='right'
              outlined
            />
          </div>
        )
      }}
    >
      <Dialog
        header='Generar Cobro'
        visible={createBill}
        onHide={closeCreateBill}
      >
        <CreatePaymentForm />
      </Dialog>
      <Dialog
        header='Cobros del mes'
        visible={monthBills}
        onHide={closeMonthBills}
      >
        <MonthBills />
      </Dialog>

      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index)
        }}
      />
      {renderComponent(activeIndex)}
    </Card>
  )
}
