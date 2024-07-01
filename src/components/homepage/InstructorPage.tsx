import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, type ReactElement, useState } from 'react'
import { type Schedule, type Account } from 'utils/types'

export default function InstructorPage({
  account
}: {
  account: Account | undefined
}): ReactElement {
  const [charges, setCharges] = useState<any>(null)

  useEffect(() => {
    if (account) {
      console.log(account)
      setCharges(account?.instructorAccount)
    }
  }, [account])

  useEffect(() => {
    console.log(charges)
  }, [charges])

  return (
    <DataTable
      value={charges?.scheduleInCharge
        .filter((sche: Schedule) => sche.start % 100 === 0)
        .sort((sche1: Schedule, sche2: Schedule) => {
          if (sche1.day && sche2.day) {
            if (sche1.day <= sche2.day) {
              return -1
            } else {
              return 1
            }
          } else {
            return 0
          }
        })}
      scrollable
      scrollHeight='60dvh'
      header='Tus clases'
    >
      <Column
        field='class.name'
        header='Clase'
      />
      <Column
        field='start'
        header='Inicia'
      />
      <Column
        field='day'
        header='Día'
      />
    </DataTable>
  )
}
