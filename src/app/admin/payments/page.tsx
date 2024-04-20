'use client'

import { useQuery } from '@tanstack/react-query'
import { EmplooyeePaymentsSection } from 'components/payments/EmployeePaymentsSection'
import { InstructorPaymentsSection } from 'components/payments/InstructorPaymentSection'
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
    <div className='w-full h-full flex flex-col gap-4'>
      <EmplooyeePaymentsSection
        employeePayments={employeePayments}
      ></EmplooyeePaymentsSection>
      <InstructorPaymentsSection
        instructorPayments={instructorPayments}
      ></InstructorPaymentsSection>
    </div>
  )
}
