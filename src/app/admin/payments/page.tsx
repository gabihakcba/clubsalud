'use client'

import { useQuery } from '@tanstack/react-query'
import { EmplooyeePaymentsSection } from 'components/payments/EmployeePaymentsSection'
import { getEmployeePayments } from 'queries/employeePayments'
import { type ReactElement } from 'react'

export default function Page(): ReactElement {
  const { data: employeePayments } = useQuery({
    queryKey: ['employeePayments'],
    queryFn: async () => {
      return await getEmployeePayments()
    }
  })

  const { data: instructorPayments } = useQuery({
    queryKey: ['insturctorPayments'],
    queryFn: async () => {
      return await getEmployeePayments()
    }
  })

  return (
    <div className='w-full h-full flex flex-col'>
      <EmplooyeePaymentsSection
        employeePayments={employeePayments}
      ></EmplooyeePaymentsSection>
    </div>
  )
}
