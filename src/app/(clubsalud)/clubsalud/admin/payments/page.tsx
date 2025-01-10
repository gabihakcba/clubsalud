import { EmployeePaymentsSection } from 'components/ClubSalud/payments/EmployeePaymentsSection'
import { InstructorPaymentsSection } from 'components/ClubSalud/payments/InstructorPaymentSection'
import { Card } from 'primereact/card'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { type ReactElement } from 'react'

export default function Page(): ReactElement {
  return (
    <Card className='w-full h-full flex flex-column gap-4'>
      <ConfirmDialog />
      <EmployeePaymentsSection />
      <InstructorPaymentsSection />
    </Card>
  )
}
