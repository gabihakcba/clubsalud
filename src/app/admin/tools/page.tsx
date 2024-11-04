'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { getExcel } from 'queries/excel'
import { type ReactElement } from 'react'

export default function Tools(): ReactElement {
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
      <div className='flex flex-column gap-4'>
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
      </div>
    </Card>
  )
}
