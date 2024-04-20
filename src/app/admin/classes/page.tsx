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
import SubscriptionForm from 'components/subscriptions/SubscriptionForm'

export default function Classes(): ReactElement {
  const [isOpen, openModal, closeModal] = useModal()

  const [isOpenS, openModalS, closeModalS] = useModal(false)
  return (
    <div className='flex flex-col items-start justify-start'>
      <div className='w-max flex items-center'>
        <h2 className='text-2xl font-black m-4'>Clases</h2>
        <HasRole required={[Permissions.ADM, Permissions.OWN]}>
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
        className='h-max scrollHidden self-center p-4'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(13rem,1fr))',
          gap: '1rem',
          alignContent: 'flex-start',
          justifyItems: 'center',
          width: '100%'
        }}
      >
        <ClassesCard />
      </section>
      <div className='w-full flex items-center gap-4'>
        <h2 className='text-2xl font-black m-4'>Planes</h2>
        <HasRole required={[Permissions.ADM, Permissions.OWN]}>
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
          <button
            className='blueButtonForm'
            type='button'
            onClick={openModalS}
          >
            Inscribir
          </button>
          <Modal
            isOpen={isOpenS}
            closeModal={closeModalS}
          >
            <SubscriptionForm closeModal={closeModalS}></SubscriptionForm>
          </Modal>
        </HasRole>
      </div>
      <PromotionSection></PromotionSection>
    </div>
  )
}
