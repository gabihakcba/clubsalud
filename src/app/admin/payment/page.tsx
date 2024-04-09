'use client'

import { useQuery } from '@tanstack/react-query'
import Modal from 'components/Modal'
import CreatePaymentForm from 'components/payments/CreatePaymentForm'
import PaymentCard from 'components/payments/PaymentCard'
import { getPayments } from 'queries/payments'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function Payment(): ReactElement {
  const [isOpen, openModal, closeModal] = useModal(false)
  const { data } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return await getPayments()
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(12rem,1fr))',
          gap: '1rem',
          alignContent: 'flex-start',
          maxHeight: '95dvh',
          overflow: 'scroll'
        }}
      >
        {data?.map((payment, index) => (
          <PaymentCard
            payment={payment}
            key={index}
          />
        ))}
      </section>
    </div>
  )
}
