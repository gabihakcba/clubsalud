import { type ReactElement } from 'react'
import { type Class_, Permissions } from 'utils/types'
import Image from 'next/image'
import gym from '../../../public/images/gym_image.png'
import Modal from 'components/Modal'
import { useModal } from 'utils/useModal'
import ClassForm from './ClassForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteClass } from 'queries/classes'
import HasRole from 'components/HasRole'
import { Button } from 'primereact/button'

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
    <div className='w-max flex flex-column'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <div className='align-self-end'>
          <Button
            onClick={openModal}
            icon='pi pi-pen-to-square'
            size='small'
            outlined
          />
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
          >
            <ClassForm class_={class_}></ClassForm>
          </Modal>
          <Button
            onClick={() => {
              mutate(class_.id)
            }}
            icon='pi pi-trash'
            size='small'
            outlined
            severity='danger'
          />
        </div>
      </HasRole>
      <Image
        src={gym}
        width={200}
        alt='gym-image'
      ></Image>
      <div className='mt-4 flex justify-content-between align-items-center'>
        <span className='font-semibold'>{class_.name}</span>
        <span>{class_.duration} hora/s</span>
      </div>
    </div>
  )
}
