import { type ReactElement } from 'react'
import { type Employee } from 'utils/types'
import EmployeeCard from './EmployeeCard'

interface params {
  employees: Employee[] | undefined
}
export default function EmployeeSection({ employees }: params): ReactElement {
  return (
    <section
      className='mt-5 ml-5 h-full scrollHidden'
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(10rem,1fr))',
        gap: '1rem',
        alignContent: 'flex-start'
      }}
    >
      {employees?.map((employee, index) => (
        <EmployeeCard
          employee={employee}
          key={index}
        ></EmployeeCard>
      ))}
    </section>
  )
}
