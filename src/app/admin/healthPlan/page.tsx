'use client'

import Modal from 'components/Modal'
import HealthAssignForm from 'components/healthPlans/HealthAssignForm'
import HealthCreateForm from 'components/healthPlans/HealthCreateForm'
import HealthSection from 'components/healthPlans/HealthSection'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function HealthPlan(): ReactElement {
  const [isCreate, openCreate, closeCreate] = useModal(false)
  const [isAssign, openAssign, closeAssign] = useModal(false)

  return (
    <div className='flex flex-col gap-2 mt-1'>
      <nav className='flex flex-col sm:flex-row gap-4 px-4 items-center'>
        <h2 className='text-2xl font-bold'>Obras sociles</h2>
        <button
          className='blueButtonForm p-1 px-2'
          onClick={openCreate}
        >
          Crear obra social
        </button>
        <Modal
          isOpen={isCreate}
          closeModal={closeCreate}
        >
          <HealthCreateForm closeModal={closeCreate}></HealthCreateForm>
        </Modal>
        <button
          className='blueButtonForm p-1 px-2'
          onClick={openAssign}
        >
          Asignar obra social
        </button>
        <Modal
          isOpen={isAssign}
          closeModal={closeAssign}
        >
          <HealthAssignForm></HealthAssignForm>
        </Modal>
      </nav>
      <hr />
      <div className='p-7'>
        <HealthSection></HealthSection>
      </div>
    </div>
  )
}
