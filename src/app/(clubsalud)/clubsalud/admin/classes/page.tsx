'use client'

import { type ReactElement } from 'react'
import { Card } from 'primereact/card'
import { ConfirmDialog } from 'primereact/confirmdialog'
import ClassesTable from 'components/ClubSalud/classes/ClassesTable'
import PlansTable from 'components/ClubSalud/classes/PlansTable'
import OffersTable from 'components/ClubSalud/offers/OffersTable'

export default function Classes(): ReactElement {
  return (
    <div className='h-screen overflow-scroll'>
      <Card className='min-h-full flex flex-column'>
        <ConfirmDialog />
        <ClassesTable />
        <OffersTable />
        <PlansTable />
      </Card>
    </div>
  )
}
