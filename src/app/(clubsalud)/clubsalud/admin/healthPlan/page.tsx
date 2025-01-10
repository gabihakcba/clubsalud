'use client'

import HealthAssignForm from 'components/ClubSalud/healthPlans/HealthAssignForm'
import HealthCreateForm from 'components/ClubSalud/healthPlans/HealthCreateForm'
import HealthSection from 'components/ClubSalud/healthPlans/HealthSection'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'

export default function HealthPlan(): ReactElement {
  const [isCreate, openCreate, closeCreate] = useModal(false)
  const [isAssign, openAssign, closeAssign] = useModal(false)

  return (
    <Card className='flex flex-column gap-2 h-full'>
      <Dialog
        header='Crear Obra Social'
        visible={isCreate}
        onHide={closeCreate}
      >
        <HealthCreateForm />
      </Dialog>
      <Dialog
        header='Asignar Obra Social'
        visible={isAssign}
        onHide={closeAssign}
      >
        <HealthAssignForm />
      </Dialog>
      <nav className='flex flex-column sm:flex-row gap-4 align-items-center'>
        <h2 className=''>Obras Sociales</h2>
        <Button
          onClick={openCreate}
          label='Crear Obra Social'
          size='small'
          icon='pi pi-plus'
          iconPos='right'
        />
        <Button
          onClick={openAssign}
          label='Asignar Obra Social'
          size='small'
          icon='pi pi-plus'
          iconPos='right'
        />
      </nav>
      <hr />
      <HealthSection></HealthSection>
    </Card>
  )
}
