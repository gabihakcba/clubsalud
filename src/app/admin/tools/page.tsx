'use client'

import { useMutation } from '@tanstack/react-query'
import MembersList from 'components/member/MembersList'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dialog } from 'primereact/dialog'
import { getExcel } from 'queries/excel'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function Tools(): ReactElement {
  const [membersList, openMembersList, closeMembersList] = useModal(false)

  const { mutate: createExcel } = useMutation({
    mutationFn: async () => {
      return await getExcel()
    },
    onSuccess: async (data) => {
    },
    onError: (error) => {
      console.log('error tonto')
      console.log(error)
    }
  })

  return (
    <Card className='h-full flex flex-column gap-4'>
      <Dialog
        visible={membersList}
        onHide={closeMembersList}
        header='Listado de alumnos'
      >
        <MembersList />
      </Dialog>
      <div className='flex gap-4'>
        <Button
          type='button'
          label='Obtener excel'
          icon='pi pi-file-excel'
          size='small'
          outlined
          className='w-max'
          iconPos='right'
          severity='success'
          onClick={() => {
            console.log('asd')
            createExcel()
            console.log('123')
          }}
        />
        <Button
            label='Listado de alumnos'
            size='small'
            outlined
            icon='pi pi-list'
            iconPos='right'
            className='w-max'
            severity='success'
            onClick={openMembersList}
          />
      </div>
    </Card>
  )
}
