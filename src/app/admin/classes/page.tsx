'use client'

import ClassesCard from 'components/classes/ClassesCard'
import { type ReactElement } from 'react'
import { useModal } from '../../../utils/useModal'
import Modal from 'components/Modal'
import CreateClassForm from 'components/classes/CreateClassForm'
import PromotionSection from 'components/promotions/PromotionSection'
import CreatePromotionForm from 'components/promotions/CreatePromotionForm'
import HasRole from 'components/HasRole'
import { Permissions } from 'utils/types'

export default function Classes(): ReactElement {
  const [isOpen, openModal, closeModal] = useModal()
  return (
    <div className='flex flex-col items-start justify-start'>
      <div className='w-max flex items-center'>
        <h2 className='text-2xl font-black m-4'>Clases</h2>
        <HasRole required={Permissions.ADM}>
          <button
            className='blueButtonForm'
            onClick={() => {
              openModal()
            }}
          >
            Crear clase
          </button>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
          >
            <CreateClassForm closeModal={closeModal}></CreateClassForm>
          </Modal>
        </HasRole>
      </div>
      <section
        className='h-max scrollHidden'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(15rem,1fr))',
          gap: '0.5rem',
          alignContent: 'flex-start',
          justifyItems: 'center',
          maxWidth: '98dvw',
          margin: '1rem'
        }}
      >
        <ClassesCard />
      </section>
      <div className='w-max flex items-center'>
        <h2 className='text-2xl font-black m-4'>Ofertas</h2>
        <HasRole required={Permissions.ADM}>
          <button
            className='blueButtonForm'
            onClick={() => {
              openModal()
            }}
          >
            Crear oferta
          </button>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
          >
            <CreatePromotionForm closeModal={closeModal}></CreatePromotionForm>
          </Modal>
        </HasRole>
      </div>
      <PromotionSection></PromotionSection>
    </div>
  )
}
