'use client'

import { EmployeePaymentsSection } from 'components/ClubSalud/payments/EmployeePaymentsSection'
import { InstructorPaymentsSection } from 'components/ClubSalud/payments/InstructorPaymentSection'
import { Card } from 'primereact/card'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { TabMenu } from 'primereact/tabmenu'
import { useState, type ReactElement } from 'react'

export default function Page(): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)
  const items = [
    { label: 'Pagos a empleados', icon: '' },
    { label: 'Pagos a profesores', icon: '' }
  ]

  const renderComponent = (index: number): ReactElement => {
    switch (index) {
      case 0:
        return <EmployeePaymentsSection />
      case 1:
        return <InstructorPaymentsSection />
      default:
        return <h2>Elemento no seleccionado</h2>
    }
  }

  return (
    <Card className='w-full h-full flex flex-column gap-4'>
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index)
        }}
      />
      {renderComponent(activeIndex)}
      <ConfirmDialog />
    </Card>
  )
}
