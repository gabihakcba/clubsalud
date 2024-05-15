import { type ReactElement } from 'react'
import { Permissions, type Promotion } from 'utils/types'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import delete_ from '../../../public/delete_.svg'
import Modal from 'components/Modal'
import { useModal } from 'utils/useModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePromotion } from 'queries/promotions'
import UpdatePromotionForm from './UpdatePromotionForm'
import { getUserToken, verifyToken } from 'utils/auth'
import HasRole from 'components/HasRole'
import { setSubscription } from 'queries/subscriptions'
import { getMemberById } from 'queries/members'

const subscribe = async (promotion: Promotion): Promise<void> => {
  const token = getUserToken()
  const user = await verifyToken(token)
  const userId = user?.id
  const member = await getMemberById(Number(userId))
  const subs = await setSubscription({
    memberId: member.data.id,
    promotion
  })
  if (!subs) {
    alert('No se pudo adherir a la suscripción')
  }
}

export default function PromotionCard({
  promotion
}: {
  promotion: Promotion
}): ReactElement {
  const [isOpen, openModal, closeModal] = useModal()

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

  return (
    <div className='w-max flex flex-col justify-between border rounded p-4 mb-5'>
      <div className='flex flex-col'>
        <HasRole required={[Permissions.ADM, Permissions.OWN]}>
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
              <UpdatePromotionForm promotion={promotion}></UpdatePromotionForm>
            </Modal>
            <button
              onClick={() => {
                mutate(promotion.id)
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
        </HasRole>
        <div className='mt-4 flex flex-col justify-between items-center'>
          <div className='flex'>
            <span className='text-xl font-semibold'>{promotion.title}</span>
          </div>
          <p className=' max-w-[7rem] block font-sans text-base font-light leading-relaxed text-inherit antialiased break-words'>
            {promotion.description}
          </p>
        </div>
      </div>
      <div>
        <div className='self-start mt-2'>${promotion.amountPrice}</div>
        <HasRole required={[Permissions.MEM, Permissions.OWN]}>
          <button
            className='mt-2 border rounded'
            onClick={async () => {
              await subscribe(promotion)
            }}
          >
            Inscribirse
          </button>
        </HasRole>
      </div>
    </div>
  )
}
