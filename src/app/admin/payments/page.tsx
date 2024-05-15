'use client'

import { useQuery } from '@tanstack/react-query'
import { EmplooyeePaymentsSection } from 'components/payments/EmployeePaymentsSection'
import { InstructorPaymentsSection } from 'components/payments/InstructorPaymentSection'
import { Card } from 'primereact/card'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { getEmployeePayments } from 'queries/employeePayments'
import { getInstructorPayments } from 'queries/instructorPayments'
import { type ReactElement } from 'react'

export default function Page(): ReactElement {
  const { data: employeePayments } = useQuery({
    queryKey: ['employeePayments'],
    queryFn: async () => {
      return await getEmployeePayments()
    }
  })

  const { data: instructorPayments } = useQuery({
    queryKey: ['instructorPayments'],
    queryFn: async () => {
      return await getInstructorPayments()
    }
  })

  return (
    <Card className='w-full h-full flex flex-column gap-4'>
      <ConfirmDialog />
      <EmplooyeePaymentsSection employeePayments={employeePayments} />
      <InstructorPaymentsSection instructorPayments={instructorPayments} />
    </Card>
  )
}
