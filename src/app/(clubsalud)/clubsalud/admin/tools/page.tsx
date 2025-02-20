'use client'

import { useMutation } from '@tanstack/react-query'
import MembersList from 'components/ClubSalud/member/MembersList'
import DerivationList from 'components/ClubSalud/tools/DerivationsList'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dialog } from 'primereact/dialog'
import { getExcel } from 'queries/ClubSalud/excel'
import { type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'

export default function Tools(): ReactElement {
  const [membersList, openMembersList, closeMembersList] = useModal(false)
  const [derivationList, openDerivationList, closeDerivationList] =
    useModal(false)

  const { mutate: createExcel, isPending } = useMutation({
    mutationFn: async () => {
      return await getExcel()
    },
    onSuccess: async (data) => {},
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
      <Dialog
        visible={derivationList}
        onHide={closeDerivationList}
        header='Listado de derivaciones'
      >
        <DerivationList />
      </Dialog>
      <div className='flex gap-4'>
        <Button
          type='button'
          label='Obtener excel'
          icon='pi pi-file-excel'
          size='small'
          outlined
          loading={isPending}
          className='w-max'
          iconPos='right'
          severity='success'
          onClick={() => {
            createExcel()
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
        <Button
          label='Listado de derivaciones'
          size='small'
          outlined
          icon='pi pi-list'
          iconPos='right'
          className='w-max'
          severity='success'
          onClick={openDerivationList}
        />
      </div>
    </Card>
  )
}
