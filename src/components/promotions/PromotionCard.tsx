import { ReactElement } from 'react'
import { Class_, Promotion } from 'utils/types'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import delete_ from '../../../public/delete_.svg'
import Modal from 'components/Modal'
import { useModal } from 'utils/useModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePromotion } from 'queries/promotions'
import UpdatePromotionForm from './UpdatePromotionForm'

export default function PromotionCard({
  promotion
}: {
  promotion: Promotion
}): ReactElement {
  const query = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deletePromotion,
    onSuccess: async (variables) => {
      await query.setQueryData(['prom'], (oldData: Promotion[]) => {
        const index = oldData.findIndex((promotion: Promotion) => {
          return promotion.id === variables.id
        })
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  const [isOpen, openModal, closeModal] = useModal()

  return (
    <div className='w-max flex flex-col border rounded p-4 mb-5'>
      <div className='self-end'>
        <button onClick={openModal}>
          <Image
            src={edit}
            width={20}
            height={20}
            alt='E'
          ></Image>
        </button>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
        >
          <UpdatePromotionForm
            promotion={promotion}
            closeModal={closeModal}
          ></UpdatePromotionForm>
        </Modal>
        <button
          onClick={() => {
            mutate(promotion.id as number)
          }}
        >
          <Image
            src={delete_}
            width={20}
            height={20}
            alt='E'
          ></Image>
        </button>
      </div>
      <div className='mt-4 flex flex-col justify-between items-center'>
        <span className='text-xl font-semibold'>{promotion.title}</span>
        <p className=' max-w-[7rem] block font-sans text-base font-light leading-relaxed text-inherit antialiased break-words'>
          {promotion.description}
        </p>
        <div className='self-start mt-2'>${promotion.amountPrice}</div>
      </div>
    </div>
  )
}
