import { type ReactElement } from 'react'
import { type Class_, Permissions } from 'utils/types'
import Image from 'next/image'
import gym from '../../../public/images/gym_image.png'
import edit from '../../../public/edit.svg'
import delete_ from '../../../public/delete_.svg'
import Modal from 'components/Modal'
import { useModal } from 'utils/useModal'
import ClassForm from './ClassForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteClass } from 'queries/classes'
import HasRole from 'components/HasRole'

export default function ClassCard2({
  class_
}: {
  class_: Class_
}): ReactElement {
  const query = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteClass,
    async onSuccess(variables) {
      await query.setQueryData(['class'], (oldData: Class_[]) => {
        const index = oldData.findIndex((class_: Class_) => {
          return class_.id === variables.data.id
        })
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  const [isOpen, openModal, closeModal] = useModal()

  return (
    <div className='w-max flex flex-col'>
      <HasRole required={Permissions.ADM}>
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
            <ClassForm
              class_={class_}
              closeModal={closeModal}
            ></ClassForm>
          </Modal>
          <button
            onClick={() => {
              mutate(class_.id)
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
      <div className=''>
        <Image
          src={gym}
          width={200}
          height={100}
          alt='gym-image'
        ></Image>
      </div>
      <div className='mt-4 flex justify-between items-center'>
        <span className='text-xl font-semibold'>{class_.name}</span>
        <span>{class_.duration} hora/s</span>
      </div>
    </div>
  )
}
