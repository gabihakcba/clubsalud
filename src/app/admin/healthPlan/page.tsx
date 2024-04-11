'use client'

import Modal from 'components/Modal'
import HealthCreateForm from 'components/healthPlans/HealthCreateForm'
import HealthSection from 'components/healthPlans/HealthSection'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function HealthPlan(): ReactElement {
  const [isOpen, openModal, closeModal] = useModal()
  return (
    <div className='flex flex-col gap-2 mt-1'>
      <nav className='flex gap-4 items-center'>
        <h2>Obras sociles</h2>
        <button
          className='blueButtonForm p-1 px-2'
          onClick={openModal}
        >
          Crear Obra Social
        </button>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
        >
          <HealthCreateForm></HealthCreateForm>
        </Modal>
      </nav>
      <hr />
      <HealthSection></HealthSection>
    </div>
  )
}
