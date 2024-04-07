'use client'

import { useQuery } from '@tanstack/react-query'
import Modal from 'components/Modal'
import CreatePaymentForm from 'components/payments/CreatePaymentForm'
import { getSubscriptions } from 'queries/subscriptions'
import { ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function Payment(): ReactElement {
  const [isOpen, openModal, closeModal] = useModal(false)
  const { data } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return await getSubscriptions()
      // const subs = members?.map((member) => member.memberSubscription).flat()
      // return subs
    }
  })
  return (
    <div>
      <button
        className='blueButtonForm m-2'
        onClick={openModal}
      >
        Generar pago
      </button>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <CreatePaymentForm closeModal={closeModal}></CreatePaymentForm>
      </Modal>
      <section
        className='mt-5 ml-5 h-full scrollHidden'
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(9rem,1fr))',
          gap: '0,5rem',
          alignContent: 'flex-start',
          maxHeight: '95dvh',
          overflow: 'scroll'
        }}
      >
        {data?.map((member) =>
          member?.memberSubscription?.map((sub) => <p>{sub.id}</p>)
        )}
      </section>
    </div>
  )
}
