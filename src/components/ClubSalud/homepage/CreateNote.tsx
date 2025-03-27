import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { createNote } from 'queries/ClubSalud/notes'
import { useState, type ReactElement } from 'react'

export default function CreateNote({
  accountId
}: {
  accountId: number
}): ReactElement {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const query = useQueryClient()

  const { mutate: create, isPending } = useMutation({
    mutationFn: async () => {
      const response = await createNote({ accountId, title, body })
      return response
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['unreadednotes'] })
    }
  })
  return (
    <form
      action=''
      className='flex flex-column gap-4 pt-4'
      onSubmit={(e) => {
        e.preventDefault()
        create()
      }}
    >
      <FloatLabel>
        <InputText
          required
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
        />
        <label htmlFor=''>Título</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          required
          value={body}
          onChange={(e) => {
            setBody(e.currentTarget.value)
          }}
        />
        <label htmlFor=''>Descripción</label>
      </FloatLabel>
      <Button
        label='Guardar'
        size='small'
        className='w-full'
        outlined
        type='submit'
        loading={isPending}
        icon='pi pi-save'
        iconPos='right'
      />
    </form>
  )
}
